import RatingRepository from '../repositories/RatingRepository';

interface RatingData {
  guest_id?: number;
  user_id?: number;
  event_id: number;
  ratings: {
    supplier_id: number;
    rating: number;
  }[];
}

class RatingService {
  static async processRatings({ guest_id, user_id, event_id, ratings }: RatingData): Promise<void> {
    const approvedSupplierIds = await RatingRepository.getApprovedSupplierIds(event_id);

    for (const { supplier_id, rating } of ratings) {
      if (!approvedSupplierIds.includes(supplier_id)) {
        throw new Error(`Supplier ${supplier_id} is not approved for this event.`);
      }

      const supplier = await RatingRepository.getSupplierById(supplier_id);

      if (!supplier) {
        throw new Error(`Supplier ${supplier_id} not found.`);
      }

      const oldRating = supplier.rating || 0;
      const ratingCount = supplier.rating_count || 0;
      const newRating = ((oldRating * ratingCount) + rating) / (ratingCount + 1);

      const roundedRating = Math.round(newRating * 100) / 100;

      await RatingRepository.updateSupplierRating(supplier_id, roundedRating, ratingCount + 1);
    }

    if (guest_id) {
      await RatingRepository.markGuestAsRated(guest_id);
    }

  }
}

export default RatingService;
