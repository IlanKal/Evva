import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export interface EventAttributes {
  event_id: number;
  user_id: number;
  event_date?: string;
  budget?: number;
  guest_count?: number;
  location?: string;
}

class Event extends Model<EventAttributes> implements EventAttributes {
  public event_id!: number;
  public user_id!: number;
  public event_date?: string;
  public budget?: number;
  public guest_count?: number;
  public location?: string;
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
    event_date: DataTypes.DATEONLY,
    budget: DataTypes.DECIMAL(10, 2),
    guest_count: DataTypes.INTEGER,
    location: DataTypes.STRING(255),
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false,
  }
);

export default Event;
