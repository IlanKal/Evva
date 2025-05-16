import { EventRequest } from "../models";
import { DJPreferences } from "../types/EventPreferences";


interface SupplierInput {
  supplier_id: number;
  supplier_type: string;
  average_rating: number;
  rating_count: number;
  price: number;
  extra_score?: number;
}

interface FilteredSuppliers {
  [key: string]: any[]; // catering, dj, etc.
}

export const prepareSuppliersForOptimization = async (
  requestId: number,
  filteredSuppliers: FilteredSuppliers
): Promise<{ [key: string]: SupplierInput[] }> => {
  const eventRequest = await EventRequest.findByPk(requestId);
  if (!eventRequest) throw new Error("Event request not found");

  const guestCount = eventRequest.guest_count || 1;
  const eventDuration = /*eventRequest.event_duration||*/ 4;
  const djPreferences: DJPreferences = eventRequest.dj_preferences || { music_styles: [] };

  const prepared: { [key: string]: SupplierInput[] } = {};

  for (const category of Object.keys(filteredSuppliers)) {
    prepared[category] = filteredSuppliers[category].map((entry: any) => {
      const supplier = entry.Supplier;
      const base: SupplierInput = {
        supplier_id: supplier.supplier_id,
        supplier_type: supplier.supplier_type,
        average_rating: supplier.rating || 0,
        rating_count: supplier.rating_count || 0,
        price: 0,
      };

      
      switch (supplier.supplier_type) {
        case "dj":
          base.price = entry.price_per_hour * eventDuration;
          if (
            Array.isArray(entry.music_styles) &&
            Array.isArray(djPreferences.music_styles)
          ) {
            const intersection = entry.music_styles.filter((style: string) =>
              djPreferences.music_styles!.includes(style)
            );
            base.extra_score = intersection.length; 
          }
          break;

        case "photographer":
          base.price = entry.price_per_hour * eventDuration;
          break;

        case "catering":
          base.price = entry.price_per_person * guestCount;
          break;

        case "speaker":
          base.price = entry.price_per_lecture;
          break;

        case "location":
          base.price = entry.price;
          break;

        default:
          base.price = 0;
      }

      return base;
    });
  }

  return prepared;
};