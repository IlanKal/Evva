import solver from "javascript-lp-solver";
import { EventRequest } from "../models";
import { getSupplierById } from "../repositories/registerSupplierRepository";
import EventSupplier from "../models/EventSupplier";

interface SupplierInput {
  supplier_id: number;
  supplier_type: string;
  average_rating: number;
  rating_count: number;
  price: number;
  extra_score?: number;
}

interface FilteredSuppliersByType {
  [category: string]: SupplierInput[];
}

interface OptimizationResult {
  best_combination: { [category: string]: number };
  alternatives: { [category: string]: number[] };
}

export const optimizeSuppliers = async (
  requestId: number,
  suppliersByType: FilteredSuppliersByType
): Promise<OptimizationResult> => {
  const request = await EventRequest.findByPk(requestId);
  if (!request) throw new Error("Event request not found");

  const budget = request.budget;
  const model: any = {
    optimize: "score",
    opType: "max",
    constraints: {
      total_cost: { max: budget },
    },
    variables: {},
    ints: {},
  };

  let maxRatingsCount = 1;
  let maxExtraScore = 1;

  // חישוב מקסימום לנירמול
  for (const category in suppliersByType) {
    for (const s of suppliersByType[category]) {
      if (s.rating_count > maxRatingsCount) maxRatingsCount = s.rating_count;
      if ((s.extra_score || 0) > maxExtraScore) maxExtraScore = s.extra_score || 0;
    }
    model.constraints[category] = { equal: 1 };
  }

  // בניית משתנים לאופטימיזציה
  for (const category in suppliersByType) {
    for (const supplier of suppliersByType[category]) {
      const key = `${category}_${supplier.supplier_id}`;

      const normalizedRating = supplier.average_rating / 5;
      const normalizedCount = supplier.rating_count / maxRatingsCount;
      const normalizedExtra = (supplier.extra_score || 0) / maxExtraScore;

      const score = normalizedRating * 0.6 + normalizedCount * 0.3 + normalizedExtra*0.1;
      

      console.log(`📊 ${category} - ${supplier.supplier_id}:`);
      console.log(`   ⭐ rating: ${supplier.average_rating} → norm ${normalizedRating.toFixed(2)}`);
      console.log(`   👥 rating_count: ${supplier.rating_count} → norm ${normalizedCount.toFixed(2)}`);
      console.log(`   🎵 extra_score: ${supplier.extra_score || 0} → norm ${normalizedExtra.toFixed(2)}`);
      console.log(`   ✅ total score: ${score.toFixed(3)}\n`);

      model.variables[key] = {
        score,
        total_cost: supplier.price,
        [category]: 1,
      };

      model.ints[key] = 1;
    }
  }
//הפעלת האלגוריתם 
  const results = solver.Solve(model);

  const best_combination: { [category: string]: any } = {};
for (const variable in results) {
  if (results[variable] === 1 && variable.includes("_")) {
    const [category, id] = variable.split("_");
    const found = suppliersByType[category].find(s => s.supplier_id === parseInt(id));
    if (found) {
      best_combination[category] = await getSupplierById(id);;
    }
  }
}

  const alternatives: { [category: string]: any[] } = {};

  for (const category in suppliersByType) {
    const currentBestId = best_combination[category]?.supplier_id;
    if (!currentBestId) continue;
    const candidates = suppliersByType[category]
      .filter((s) => s.supplier_id !== currentBestId && s.price <= budget)
      .map((s) => {
        const normalizedRating = s.average_rating / 5;
        const normalizedCount = s.rating_count / maxRatingsCount;
        const normalizedExtra = (s.extra_score || 0) / maxExtraScore;
        const score = normalizedRating * 0.5 + normalizedCount * 0.4 + normalizedExtra*0.1;
        return { id: s.supplier_id, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      

      alternatives[category] = await Promise.all(
        candidates.map(async (c) => {
          const supplier = await getSupplierById(String(c.id));
          return supplier;
        })
      );
  }
  const supplierEntriesToInsert: {
    event_id: number;
    supplier_id: number;
    approval_status: 'SUGGESTED' | 'BACKUP';
  }[] = [];
  
  // Suggested 
for (const category in best_combination) {
  const supplier = best_combination[category];
  supplierEntriesToInsert.push({
    event_id: requestId,
    supplier_id: supplier.supplier_id,
    approval_status: 'SUGGESTED',
  });
}

// סינון כפילויות
const suggestedIds = new Set(
  Object.values(best_combination).map((s) => s.supplier_id)
);

// Backup
for (const category in alternatives) {
  for (const supplier of alternatives[category]) {
    if (suggestedIds.has(supplier.supplier_id)) continue;

    supplierEntriesToInsert.push({
      event_id: requestId,
      supplier_id: supplier.supplier_id,
      approval_status: 'BACKUP',
    });
  }
}

await EventSupplier.bulkCreate(supplierEntriesToInsert);

  return { best_combination, alternatives };
};