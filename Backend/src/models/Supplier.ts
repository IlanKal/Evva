import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Region, REGIONS } from "../constants/regions";
import { Weekday } from "../constants/weekdays";

// נגדיר ממשק לשדות
interface SupplierAttributes {
  supplier_id?: number; // שדה אוטומטי
  name: string;
  email: string;
  password: string;
  available_days?: Weekday[];
  region?: Region;
  rating?: number;
  ratings_count: number;
  image_url?: string;
  additional_info?: string;
  contact_info?: string;
  rating_count?: number;

  
}

class Supplier extends Model<SupplierAttributes> implements SupplierAttributes {
  public supplier_id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public available_days?: Weekday[];
  public region?: Region;
  public rating?: number;
  public ratings_count!: number;
  public image_url?: string;
  public additional_info?: string;
  public contact_info?: string;
  public rating_count!: number;

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
    available_days: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "All",
      //validate: {
      //  isIn: [REGIONS as unknown as string[]], 
      //},
    },
    rating: DataTypes.FLOAT,
    ratings_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image_url: DataTypes.STRING(255),
    additional_info: DataTypes.TEXT,
    contact_info: DataTypes.TEXT,
    rating_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Supplier",
    tableName: "suppliers",
    timestamps: false,
  }
);

export default Supplier;