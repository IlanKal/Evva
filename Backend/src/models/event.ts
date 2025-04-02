import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./User";

export const Event = sequelize.define("Event", {
    event_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: "user_id" } },
    event_date: { type: DataTypes.DATE },
    budget: { type: DataTypes.DECIMAL(10, 2) },
    guest_count: { type: DataTypes.INTEGER },
    location: { type: DataTypes.STRING }
});