import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface EventRequestAttributes {
  request_id: number;
  user_id: number;
  event_type: 'conference' | 'Seminar' | 'Corporate event' | 'Product launch' | 'Customer event';
  event_date: string | null;
  budget: number | null;
  guest_count: number | null;
  location: string | null;
  catering_preferences: object | null;
  photographer_preferences: object | null;
  dj_preferences: object | null;
  location_preferences: object | null;
  lecturer_preferences: object | null;
  additional_notes: string | null;
  status: 'draft' | 'finalized';
  created_at?: string;
}

interface EventRequestCreationAttributes extends Optional<EventRequestAttributes, 'request_id' | 'created_at'> {}

class EventRequest extends Model<EventRequestAttributes, EventRequestCreationAttributes> implements EventRequestAttributes {
  request_id!: number;
  user_id!: number;
  event_type!: 'conference' | 'Seminar' | 'Corporate event' | 'Product launch' | 'Customer event';
  event_date!: string | null;
  budget!: number | null;
  guest_count!: number | null;
  location!: string | null;
  catering_preferences!: object | null;
  photographer_preferences!: object | null;
  dj_preferences!: object | null;
  location_preferences!: object | null;
  lecturer_preferences!: object | null;
  additional_notes!: string | null;
  status!: 'draft' | 'finalized';
  created_at?: string;
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
        isIn: [['conference', 'Seminar', 'Corporate event', 'Product launch', 'Customer event']],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['draft', 'finalized']],
      },
    },
    event_date: DataTypes.DATEONLY,
    budget: DataTypes.DECIMAL(10, 2),
    guest_count: DataTypes.INTEGER,
    location: DataTypes.STRING(255),
    catering_preferences: DataTypes.JSON,
    photographer_preferences: DataTypes.JSON,
    dj_preferences: DataTypes.JSON,
    location_preferences: DataTypes.JSON,
    lecturer_preferences: DataTypes.JSON,
    additional_notes: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: 'EventRequest',
    tableName: 'event_requests',
    timestamps: true,
  }
);

export default EventRequest;
