import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Supplier } from "./Supplier";

export const Catering = sequelize.define("Catering", {
    catering_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    supplier_id: { type: DataTypes.INTEGER, references: { model: Supplier, key: "supplier_id" } },
    price_per_person: { type: DataTypes.DECIMAL(10, 2) },
    menu: { type: DataTypes.TEXT },
    kosher: { type: DataTypes.BOOLEAN },
    vegetarian: { type: DataTypes.BOOLEAN },
    vegan: { type: DataTypes.BOOLEAN },
    gluten_free: { type: DataTypes.BOOLEAN }
});