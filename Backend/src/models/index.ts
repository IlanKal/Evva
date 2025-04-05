import { sequelize } from "../config/db";

// מייבא את כל המודלים
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

// 🔗 הגדרת קשרים בין מודלים

// ספקים ↔ פרטי שירות
Supplier.hasMany(Location, { foreignKey: "supplier_id" });
Supplier.hasMany(Catering, { foreignKey: "supplier_id" });
Supplier.hasMany(Photographer, { foreignKey: "supplier_id" });
Supplier.hasMany(Speaker, { foreignKey: "supplier_id" });
Supplier.hasMany(DJ, { foreignKey: "supplier_id" });

// משתמשים ↔ אירועים
User.hasMany(Event, { foreignKey: "user_id" });
Event.belongsTo(User, { foreignKey: "user_id" });

// אירועים ↔ ספקים (קשר רבים-לרבים)
Event.belongsToMany(Supplier, {
  through: EventSupplier,
  foreignKey: "event_id",
});
Supplier.belongsToMany(Event, {
  through: EventSupplier,
  foreignKey: "supplier_id",
});

// אירוע ↔ אורחים
Event.hasMany(Guest, { foreignKey: "event_id" });

// ייצוא המודלים וה־sequelize
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

// סנכרון מול מסד הנתונים
export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};
