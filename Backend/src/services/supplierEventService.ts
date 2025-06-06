import EventSupplier from "../models/EventSupplier";
import Event from "../models/event";
import User  from "../models/User";
import dayjs from "dayjs";

export const getSupplierDashboardEvents = async (supplierId: number) => {
  const all = await EventSupplier.findAll({
    where: { supplier_id: supplierId },
    include: [
  {
    model: Event,
    attributes: ["event_id", "title", "event_date", "guest_count", "location", "user_id"],
    include: [
      {
        model: User,   // ייבוא של מודל המשתמש
        attributes: ["full_name", "email", "phone", "role"]
      }
    ]
  }
]
  });

  const now = dayjs();

  const active: any[] = [];
  const rejected: any[] = [];
  const past: any[] = [];

  for (const item of all) {
    
    const event = (item as any).Event; 
    if (!event) continue;
    const user = event?.User;

    const isPast = dayjs(event.event_date).isBefore(now, "day");

    const base = {
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      guest_count: event.guest_count,
      location: event.location,
      status: item.approval_status,
      chosen_at: item.chosen_at,
      approved_at: item.approved_at,
      declined_at: item.declined_at,
      customer: user ? {
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
  } : null
    };

    if (isPast) {
      past.push(base);
    } else if (item.approval_status === "DECLINED") {
      rejected.push(base);
    } else {
      active.push({
        ...base,
        actions: {
          can_approve: item.approval_status === "CHOSEN",
          can_decline: item.approval_status === "CHOSEN"
        }
      });
    }
  }

  return { active, rejected, past };
};
