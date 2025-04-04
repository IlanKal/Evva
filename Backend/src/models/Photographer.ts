import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Supplier } from "./Supplier";

export const Photographer = sequelize.define("Photographer", {
    photographer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    supplier_id: { type: DataTypes.INTEGER, references: { model: Supplier, key: "supplier_id" } },
    price_per_hour: { type: DataTypes.DECIMAL(10, 2) },
    has_magnets: { type: DataTypes.BOOLEAN },
    has_stills: { type: DataTypes.BOOLEAN },
    has_video: { type: DataTypes.BOOLEAN }
});