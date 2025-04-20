import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { MusicStyle} from "../constants/musicStyles";

interface DJAttributes {
  dj_id?: number;
  supplier_id: number;
  price_per_hour?: number;
  music_styles?: MusicStyle[];
}

class DJ extends Model<DJAttributes> implements DJAttributes {
  public dj_id!: number;
  public supplier_id!: number;
  public price_per_hour?: number;
  public music_styles?: MusicStyle[];
}

DJ.init(
  {
    dj_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_hour: DataTypes.DECIMAL(10, 2),
    music_styles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'DJ',
    tableName: 'djs',
    timestamps: false,
  }
);

export default DJ;
