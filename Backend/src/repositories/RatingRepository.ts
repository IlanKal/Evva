import { Transaction } from 'sequelize';
import Supplier from '../models/Supplier';
import Guest from '../models/Guest';
import EventSupplier from '../models/EventSupplier';
import { sequelize } from '../config/db';

class RatingRepository {
  static async getApprovedSupplierIds(eventId: number): Promise<number[]> {
    const approvedSuppliers = await EventSupplier.findAll({
      where: {
        event_id: eventId,
        approval_status: 'APPROVED',
      },
    });

    return approvedSuppliers.map((supplier) => supplier.supplier_id);
  }

  static async getSupplierById(supplierId: number): Promise<Supplier | null> {
    return Supplier.findByPk(supplierId);
  }

  static async updateSupplierRating(
    supplierId: number,
    newRating: number,
    newRatingCount: number,
    transaction?: Transaction
  ): Promise<void> {
    await Supplier.update(
      {
        rating: newRating,
        rating_count: newRatingCount,
      },
      {
        where: { supplier_id: supplierId },
        transaction,
      }
    );
  }

  static async markGuestAsRated(guestId: number, transaction?: Transaction): Promise<void> {
    await Guest.update(
      { has_rated: true },
      {
        where: { guest_id: guestId },
        transaction,
      }
    );
  }

  static async withTransaction<T>(callback: (transaction: Transaction) => Promise<T>): Promise<T> {
    return await sequelize.transaction(callback);
  }
}

export default RatingRepository;
