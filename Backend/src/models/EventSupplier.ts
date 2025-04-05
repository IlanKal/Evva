import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class EventSupplier extends Model {}

EventSupplier.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'EventSupplier',
    tableName: 'event_suppliers',
    timestamps: false,
  }
);

export default EventSupplier;
