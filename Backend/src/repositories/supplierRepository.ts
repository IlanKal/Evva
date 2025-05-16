import Supplier from '../models/Supplier';
import EventSupplier from '../models/EventSupplier';

export const getApprovedSuppliersForEvent = async (eventId: number) => {
  const approvedLinks = await EventSupplier.findAll({
    where: {
      event_id: eventId,
      approval_status: 'APPROVED',
    },
  });

  const supplierIds = approvedLinks.map(link => link.supplier_id);

  return await Supplier.findAll({
    where: { supplier_id: supplierIds },
    attributes: ['supplier_id', 'name', 'supplier_type', 'image_url'],
  });
};
