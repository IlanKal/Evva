import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { EVENT_TYPES } from "../constants/eventTypes";

interface EventRequestAttributes {
  request_id?: number;
  user_id: number;
  event_type?: string;
  event_date: string;
  budget: number;
  guest_count: number;
  location?: string;

  catering_preferences?: object;
  photographer_preferences?: object;
  dj_preferences?: object;
  location_preferences?: object;
  lecturer_preferences?: object;

  additional_notes?: string;
  status?: "pending" | "in_progress" | "completed";
}
class EventRequest extends Model<EventRequestAttributes> implements EventRequestAttributes {
  public request_id!: number;
  public user_id!: number;
  public event_type?: string;
  public event_date!: string;
  public budget!: number;
  public guest_count!: number;
  public location?: string;

  public catering_preferences?: object;
  public photographer_preferences?: object;
  public dj_preferences?: object;
  public location_preferences?: object;
  public lecturer_preferences?: object;

  public additional_notes?: string;
  public status?: "pending" | "in_progress" | "completed";
}

EventRequest.init(
  {
    request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_type: {
      type: DataTypes.STRING,
      allowNull:true,
      validate:{ 
        isIn: [EVENT_TYPES as unknown as string[]],
      }

    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    guest_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    catering_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    photographer_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    dj_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    location_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    lecturer_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    additional_notes: {
      type: DataTypes.TEXT,
    },
    status: {
      //type: DataTypes.ENUM("pending", "in_progress", "completed"),
      //defaultValue: "pending",
      type: DataTypes.STRING,
      allowNull:true,
    },
  },
  {
    sequelize,
    modelName: "EventRequest",
    tableName: "event_requests",
    timestamps: false,
  }
);

export default EventRequest;
