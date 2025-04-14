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


Supplier.hasMany(Location, { foreignKey: "supplier_id" });
Supplier.hasMany(Catering, { foreignKey: "supplier_id" });
Supplier.hasMany(Photographer, { foreignKey: "supplier_id" });
Supplier.hasMany(Speaker, { foreignKey: "supplier_id" });
Supplier.hasMany(DJ, { foreignKey: "supplier_id" });


User.hasMany(Event, { foreignKey: "user_id" });
Event.belongsTo(User, { foreignKey: "user_id" });


Event.belongsToMany(Supplier, {
  through: EventSupplier,
  foreignKey: "event_id",
});
Supplier.belongsToMany(Event, {
  through: EventSupplier,
  foreignKey: "supplier_id",
});


Event.hasMany(Guest, { foreignKey: "event_id" });

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
};

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};
