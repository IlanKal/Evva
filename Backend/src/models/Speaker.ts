import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Speaker extends Model {}

Speaker.init(
  {
    speaker_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_lecture: DataTypes.DECIMAL(10, 2),
    lecture_duration: DataTypes.INTEGER,
    lecture_field: DataTypes.STRING(100),
  },
  {
    sequelize,
    modelName: 'Speaker',
    tableName: 'speakers',
    timestamps: false,
  }
);

export default Speaker;
