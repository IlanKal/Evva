import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import RsvpStatus from '../types/RsvpStatus'; 

interface EventSupplierAttributes {
  event_id: number;
  supplier_id: number;
  approval_status?: RsvpStatus;
}

export class EventSupplier extends Model {
  public id!: number;
  public event_id!: number;
  public supplier_id!: number;
  public approval_status!: 'SUGGESTED' | 'BACKUP' | 'CHOSEN' | 'APPROVED' | 'DECLINED';
}
//'suggested' - האופציה המושלמת
//'backup' - האלטרנטיבות
//'chosen' - מה שהלקוח בחר
//'approved' - הספק אישר
//'declined' - הספק דחה
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
        isIn: [['SUGGESTED', 'BACKUP', 'CHOSEN', 'APPROVED' ,'DECLINED']],
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
