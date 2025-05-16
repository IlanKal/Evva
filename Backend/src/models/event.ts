import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface EventAttributes {
  event_id: number;
  user_id: number;
  event_date?: string;
  budget?: number;
  guest_count?: number;
  location?: string;
  event_request_id?: number;
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
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false,
  }
);

export default Event;
