import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

interface CateringAttributes {
  catering_id?: number;
  supplier_id: number;
  price_per_person?: number;
  menu?: string;
  kosher?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  gluten_free?: boolean;
}

class Catering extends Model<CateringAttributes> implements CateringAttributes {
  public catering_id!: number;
  public supplier_id!: number;
  public price_per_person?: number;
  public menu?: string;
  public kosher?: boolean;
  public vegetarian?: boolean;
  public vegan?: boolean;
  public gluten_free?: boolean;
}
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
