import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class DJ extends Model {}

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
    music_styles: DataTypes.STRING(100),
  },
  {
    sequelize,
    modelName: 'DJ',
    tableName: 'djs',
    timestamps: false,
  }
);

export default DJ;
