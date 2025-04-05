import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Catering extends Model {}

Catering.init(
  {
    catering_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_person: DataTypes.DECIMAL(10, 2),
    menu: DataTypes.TEXT,
    kosher: DataTypes.BOOLEAN,
    vegetarian: DataTypes.BOOLEAN,
    vegan: DataTypes.BOOLEAN,
    gluten_free: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: 'Catering',
    tableName: 'catering',
    timestamps: false,
  }
);

export default Catering;
