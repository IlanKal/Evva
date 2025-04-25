import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import RsvpStatus from '../types/RsvpStatus'; 

interface EventSupplierAttributes {
  event_id: number;
  supplier_id: number;
  approval_status?: RsvpStatus;
}

class EventSupplier extends Model<EventSupplierAttributes> implements EventSupplierAttributes {
  public event_id!: number;
  public supplier_id!: number;
  public approval_status!: RsvpStatus;
}

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
    approval_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING',
      validate: {
        isIn: [['PENDING', 'APPROVED', 'REJECTED']],
      },
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
