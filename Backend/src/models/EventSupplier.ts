import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class EventSupplier extends Model {
  public id!: number;
  public event_id!: number;
  public supplier_id!: number;
  public approval_status!: 'suggested' | 'backup' | 'chosen' | 'approved' | 'declined';
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
      type: DataTypes.ENUM('suggested', 'backup', 'chosen', 'approved', 'declined'),
      allowNull: false,
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
