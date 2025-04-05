import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Guest extends Model {}

Guest.init(
  {
    guest_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    full_name: DataTypes.STRING(255),
    phone: DataTypes.STRING(20),
    email: DataTypes.STRING(255),
    rsvp: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'Guest',
    tableName: 'guests',
    timestamps: false,
  }
);

export default Guest;
