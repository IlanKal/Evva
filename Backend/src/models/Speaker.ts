import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

interface SpeakerAttributes {
  speaker_id?: number;
  supplier_id: number;
  price_per_lecture?: number;
  lecture_duration?: number;
  lecture_field?: string;
}

class Speaker extends Model<SpeakerAttributes> implements SpeakerAttributes {
  public speaker_id!: number;
  public supplier_id!: number;
  public price_per_lecture?: number;
  public lecture_duration?: number;
  public lecture_field?: string;
}

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
