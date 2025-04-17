// src/services/optimizeSuppliers.ts
import solver from 'javascript-lp-solver';
import EventRequest from '../models/EventRequest';
import {
    LocationPreferences,
    CateringPreferences,
    DJPreferences,
    PhotographerPreferences,
    LecturerPreferences,
  } from "../types/EventPreferences"; 

interface SupplierOption {
  id: number;
  type: string; // למשל "dj", "catering"
  price: number;
  score: number;
}

interface FilteredSuppliers {
  catering?: any[];
  djs?: any[];
  locations?: any[];
  photographers?: any[];
  speakers?: any[];
}

export const optimizeSuppliers = async (
  filteredSuppliers: FilteredSuppliers,
  requestId: number
) => {
  // שליפת פרטי הבקשה (כולל תקציב ומספר אורחים)
  const eventRequest = await EventRequest.findByPk(requestId);
  if (!eventRequest) {
    throw new Error("❌ Event request not found");
  }


//שליפת משתנים מתוך הבקשה
  const {
    event_date,
    budget,
    guest_count,
    location,
    location_preferences,
    catering_preferences,
    dj_preferences,
    photographer_preferences,
    lecturer_preferences,
  } = eventRequest.get() as {
    event_date: string;
    budget: number;
    guest_count: number;
    location?: string;
    location_preferences?: LocationPreferences;
    catering_preferences?: CateringPreferences;
    dj_preferences?: DJPreferences;
    photographer_preferences?: PhotographerPreferences;
    lecturer_preferences?: LecturerPreferences;
  };


  //פה יישמרו כל הספקים עם המחיר והציון שלהם
  const variables: any = {};
  //פה נגדיר את המגבלות (כמו תקציב, מקסימום 3 מכל סוג)
  const constraints: any = {
    budget: { max: Number(budget) },
  };
// אומר שהבחירה היא בוליאנית - אם בוחרים את הספק או לא 
  const ints: any = {};

  for (const [type, suppliers] of Object.entries(filteredSuppliers)) {
    if (!suppliers) continue;

    suppliers.forEach((supplier: any, index: number) => {
      const key = `${type}_${supplier.supplier_id}`;

      // ניסיון לחלץ מחיר מכל סוג ספק
      const price =
        supplier.price_per_hour ||
        supplier.price_per_lecture ||
        supplier.price_per_person * guest_count || // למשל בקייטרינג
        supplier.price ||
        0;

      const score =
        (supplier.rating || 0) + (supplier.ratings_count || 0) * 0.05;

      variables[key] = {
        score,
        budget: price,
      };

      // לא יותר מ-3 מכל סוג
      if (!constraints[type]) {
        constraints[type] = { max: 3 };
      }
      variables[key][type] = 1;

      ints[key] = 1;
    });
  }

  const model = {
    optimize: 'score',
    opType: 'max',
    constraints,
    variables,
    ints,
  };

  const results = solver.Solve(model);

  const selectedSuppliers = Object.keys(results)
    .filter(
      (key) => results[key] === 1 && key !== 'feasible' && key !== 'result'
    )
    .map((key) => {
      const [type, id] = key.split('_');
      return { type, supplier_id: parseInt(id) };
    });

  return selectedSuppliers;
};
