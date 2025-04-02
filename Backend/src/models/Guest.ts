import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Event } from "./Event";

export const Guest = sequelize.define("Guest", {
    guest_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    event_id: { type: DataTypes.INTEGER, references: { model: Event, key: "event_id" } },
    full_name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    rsvp: { type: DataTypes.BOOLEAN }
});
