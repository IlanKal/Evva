import EventSupplier from '../models/EventSupplier';
import event from '../models/event';
import Supplier from '../models/Supplier';


export const getSupplierNotifications = async (supplierId: number) => {
  const chosenEvents = await EventSupplier.findAll({
    where: {
      supplier_id: supplierId,
      approval_status: 'CHOSEN',
      was_notified_to_supplier: false
    },
    include: [{ model: event, as: 'event' }]
  });

  // עדכון הדגלים ל־TRUE
  await Promise.all(
    chosenEvents.map(item => item.update({ was_notified_to_supplier: true }))
  );

  return chosenEvents.map(item => ({
    message: `📩 You've been chosen for event "${item.event?.title || 'Unnamed Event'}"`,
    eventId: item.event_id
  }));
};

export const getUserNotifications = async (userId: number) => {
  const updatedSuppliers = await EventSupplier.findAll({
    include: [
      {
        model: event,
        as: 'event',
        where: { user_id: userId }
      },{
      model: Supplier,
      as: 'Supplier' 
    }
    ],
    where: {
        approval_status: ['APPROVED', 'DECLINED'],
        was_notified_to_user: false
    }
  });

  await Promise.all(
    updatedSuppliers.map(item => item.update({ was_notified_to_user: true }))
  );

  return updatedSuppliers.map(item => ({
    message:
      item.approval_status === 'APPROVED' 
        ? `✅ ${item.Supplier?.name} confirmed your request for "${item.event?.title}"`
        : `❌ ${item.Supplier?.name} rejected your request for "${item.event?.title}"`,
    eventId: item.event_id
  }));
};