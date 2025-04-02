import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Supplier } from "./Supplier";

export const DJ = sequelize.define("DJ", {
    dj_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    supplier_id: { type: DataTypes.INTEGER, references: { model: Supplier, key: "supplier_id" } },
    price_per_hour: { type: DataTypes.DECIMAL(10, 2) },
    music_styles: { type: DataTypes.STRING }
});
