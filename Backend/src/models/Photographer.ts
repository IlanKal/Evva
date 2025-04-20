import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

interface PhotographerAttributes {
  photographer_id?: number;
  supplier_id: number;
  price_per_hour?: number;
  has_magnets?: boolean;
  has_stills?: boolean;
  has_video?: boolean;
}

class Photographer extends Model<PhotographerAttributes> implements PhotographerAttributes {
  public photographer_id!: number;
  public supplier_id!: number;
  public price_per_hour?: number;
  public has_magnets?: boolean;
  public has_stills?: boolean;
  public has_video?: boolean;
}

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
