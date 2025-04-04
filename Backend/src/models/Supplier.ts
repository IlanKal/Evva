import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Supplier = sequelize.define("Supplier", {
    supplier_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    available_days: { type: DataTypes.STRING },
    region: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
    image_url: { type: DataTypes.STRING },
    additional_info: { type: DataTypes.TEXT },
    contact_info: { type: DataTypes.TEXT }
});