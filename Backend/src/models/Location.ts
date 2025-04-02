import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Supplier } from "./Supplier";

export const Location = sequelize.define("Location", {
    location_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    supplier_id: { type: DataTypes.INTEGER, references: { model: Supplier, key: "supplier_id" } },
    address: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    capacity: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL(10, 2) },
    parking: { type: DataTypes.BOOLEAN },
    place_type: { type: DataTypes.STRING }
});