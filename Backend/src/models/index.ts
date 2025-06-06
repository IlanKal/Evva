import { sequelize } from "../config/db";

import Supplier from "./Supplier";
import Location from "./Location";
import Catering from "./Catering";
import Photographer from "./Photographer";
import Speaker from "./Speaker";
import DJ from "./DJ";
import User from "./User";
import Event from "./event";
import EventSupplier from "./EventSupplier";
import Guest from "./Guest";
import EventRequest from "./EventRequest";



Supplier.hasMany(Location, { foreignKey: "supplier_id",as: "locations"  });
Supplier.hasMany(Catering, { foreignKey: "supplier_id",as: "caterings"  });
Supplier.hasMany(Photographer, { foreignKey: "supplier_id",as: "photographers"  });
Supplier.hasMany(Speaker, { foreignKey: "supplier_id" ,as: "speakers" });
Supplier.hasMany(DJ, { foreignKey: "supplier_id",as: "djs"  });
EventSupplier.belongsTo(Event, {
  foreignKey: "event_id",
  as: "event"
});

Location.belongsTo(Supplier, { foreignKey: "supplier_id" });
Catering.belongsTo(Supplier, { foreignKey: "supplier_id" });
Photographer.belongsTo(Supplier, { foreignKey: "supplier_id" });
Speaker.belongsTo(Supplier, { foreignKey: "supplier_id" });
DJ.belongsTo(Supplier, { foreignKey: "supplier_id" });

Guest.belongsTo(Event, { foreignKey: "event_id" });
// משתמשים ↔ אירועים
User.hasMany(Event, { foreignKey: "user_id" });
Event.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(EventSupplier, {
  foreignKey: "event_id",
  as: "EventSuppliers",
});

EventSupplier.belongsTo(Event, {
  foreignKey: "event_id",
});

Event.belongsToMany(Supplier, {
  through: EventSupplier,
  foreignKey: "event_id",
});
Supplier.belongsToMany(Event, {
  through: EventSupplier,
  foreignKey: "supplier_id",
});


Event.hasMany(Guest, { foreignKey: "event_id" });

// Event שייך ל־EventRequest (1:1)
Event.belongsTo(EventRequest, {
  foreignKey: "event_request_id",
  as: "EventRequest",
});

// EventRequest מחזיק Event אחד (אם נוצר)
EventRequest.hasOne(Event, {
  foreignKey: "event_request_id",
});


// קשר בין EventSupplier ↔ Supplier
EventSupplier.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  as: "Supplier",
});
Supplier.hasMany(EventSupplier, {
  foreignKey: "supplier_id",
  as: "EventSuppliers",
});


export {
  sequelize,
  Supplier,
  Location,
  Catering,
  Photographer,
  Speaker,
  DJ,
  User,
  Event,
  EventSupplier,
  Guest,
  EventRequest,
};

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};
