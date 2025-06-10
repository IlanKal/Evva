import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

import { EVENT_STATUS, EventStatus } from '../constants/EventStatus';
import { EVENT_TYPES, EventType } from '../constants/eventTypes';

interface EventAttributes {
  event_id: number;
  user_id: number;
  event_date?: string;
  budget?: number;
  guest_count?: number;
  location?: string;
  event_request_id?: number;
  status: EventStatus;
  title: string;
  event_type: EventType;
  company_name?: string;
  event_start_time?: string;
  event_duration_hours?: number;
}

type EventCreationAttributes = Optional<EventAttributes, 'event_id'>;

class Event extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes {
  public event_id!: number;
  public user_id!: number;
  public event_date?: string;
  public budget?: number;
  public guest_count?: number;
  public location?: string;
  public event_request_id?: number;
  public status!: EventStatus;
  public title!: string;
  public event_type!: EventType;
  public company_name?: string;
  public event_start_time?: string;
  public event_duration_hours?: number;
}

Event.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    guest_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    event_request_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'event_requests',
        key: 'request_id',
      },
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [EVENT_STATUS],
      },
      defaultValue: 'PLANNING',
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [EVENT_TYPES],
      },
      defaultValue: 'Conference',
    },
    company_name: {
      type: DataTypes.STRING(255),
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
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false,
  }
);

export default Event;
