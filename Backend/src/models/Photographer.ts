import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Photographer extends Model {}

Photographer.init(
  {
    photographer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_hour: DataTypes.DECIMAL(10, 2),
    has_magnets: DataTypes.BOOLEAN,
    has_stills: DataTypes.BOOLEAN,
    has_video: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'Photographer',
    tableName: 'photographers',
    timestamps: false,
  }
);

export default Photographer;
