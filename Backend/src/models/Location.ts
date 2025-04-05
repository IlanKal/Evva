import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Location extends Model {}

Location.init(
  {
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: DataTypes.STRING(255),
    city: DataTypes.STRING(100),
    capacity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
    parking: DataTypes.BOOLEAN,
    place_type: DataTypes.STRING(100),
  },
  {
    sequelize,
    modelName: 'Location',
    tableName: 'locations',
    timestamps: false,
  }
);

export default Location;
