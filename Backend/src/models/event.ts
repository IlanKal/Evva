import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Event extends Model {}

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
