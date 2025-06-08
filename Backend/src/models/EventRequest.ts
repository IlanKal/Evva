import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { EVENT_TYPES, EventType } from "../constants/eventTypes";

interface EventRequestAttributes {
  request_id?: number;
  user_id: number;
  event_type?: EventType;
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
  event_id?: number;
  title?: string;
  company_name?: string;
  event_start_time?: string; 
  event_duration_hours?: number;
  is_locked?: boolean; 
}

class EventRequest extends Model<EventRequestAttributes> implements EventRequestAttributes {
  public request_id!: number;
  public user_id!: number;
  public event_type?: EventType;
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
  public event_id?: number;
  public title?: string;
  public company_name?: string;
  public event_start_time?: string;
  public event_duration_hours?: number;
  public is_locked?: boolean;
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
      allowNull: true,
      validate: {
        isIn: [EVENT_TYPES as unknown as string[]],
      },
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
      allowNull: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    event_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    event_duration_hours: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    is_locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
