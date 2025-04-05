import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

// נגדיר ממשק לשדות
interface SupplierAttributes {
  supplier_id?: number; // שדה אוטומטי
  name: string;
  email: string;
  password: string;
  available_days?: string;
  region?: string;
  rating?: number;
  image_url?: string;
  additional_info?: string;
  contact_info?: string;
}

class Supplier extends Model<SupplierAttributes> implements SupplierAttributes {
  public supplier_id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public available_days?: string;
  public region?: string;
  public rating?: number;
  public image_url?: string;
  public additional_info?: string;
  public contact_info?: string;
}

Supplier.init(
  {
    supplier_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    available_days: DataTypes.STRING,
    region: DataTypes.STRING(50),
    rating: DataTypes.INTEGER,
    image_url: DataTypes.STRING(255),
    additional_info: DataTypes.TEXT,
    contact_info: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Supplier",
    tableName: "suppliers",
    timestamps: false,
  }
);

export default Supplier;
