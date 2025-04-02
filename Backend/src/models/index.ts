import { sequelize } from "../config/database";
import { Supplier } from "./Supplier";
import { Location } from "./Location";
import { Catering } from "./Catering";
import { Photographer } from "./Photographer";
import { Speaker } from "./Speaker";
import { DJ } from "./DJ";
import { User } from "./User";
import { Event } from "./Event";
import { EventSupplier } from "./EventSupplier";
import { Guest } from "./Guest";

// Associations
Supplier.hasMany(Location, { foreignKey: "supplier_id" });
Supplier.hasMany(Catering, { foreignKey: "supplier_id" });
Supplier.hasMany(Photographer, { foreignKey: "supplier_id" });
Supplier.hasMany(Speaker, { foreignKey: "supplier_id" });
Supplier.hasMany(DJ, { foreignKey: "supplier_id" });

User.hasMany(Event, { foreignKey: "user_id" });
Event.belongsTo(User, { foreignKey: "user_id" });

Event.belongsToMany(Supplier, { through: EventSupplier, foreignKey: "event_id" });
Supplier.belongsToMany(Event, { through: EventSupplier, foreignKey: "supplier_id" });

Event.hasMany(Guest, { foreignKey: "event_id" });

export { Supplier, Location, Catering, Photographer, Speaker, DJ, User, Event, EventSupplier, Guest, sequelize };
