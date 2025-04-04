import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Event } from "./event";
import { Supplier } from "./Supplier";

export const EventSupplier = sequelize.define("EventSupplier", {
    event_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        references: { model: Event, key: "event_id" } 
    },
    supplier_id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        references: { model: Supplier, key: "supplier_id" } 
    }
});
