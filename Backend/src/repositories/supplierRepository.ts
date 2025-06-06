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

export const findSupplierById = async (id: string) => {
  return await Supplier.findByPk(id);
};

export const updateSupplier = async (id: string, data: any) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) return null;
  return await supplier.update(data);
};
