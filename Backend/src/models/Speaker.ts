import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Supplier } from "./Supplier";

export const Speaker = sequelize.define("Speaker", {
    speaker_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    supplier_id: { type: DataTypes.INTEGER, references: { model: Supplier, key: "supplier_id" } },
    price_per_lecture: { type: DataTypes.DECIMAL(10, 2) },
    lecture_duration: { type: DataTypes.INTEGER },
    lecture_field: { type: DataTypes.STRING }
});