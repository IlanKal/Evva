import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import RsvpStatus from '../types/RsvpStatus'; 
import Supplier from './Supplier';
import { APPROVAL_STATUS_VALUES, ApprovalSupplierStatus } from '../constants/approvalSupplierStatus';


interface EventSupplierAttributes {
  event_id: number;
  supplier_id: number;
  approval_status?: ApprovalSupplierStatus;
  chosen_at?: Date;
  approved_at?: Date;
  declined_at?: Date;
  is_final: boolean;
}

export class EventSupplier extends Model {
  public event_id!: number;
  public supplier_id!: number;
  public approval_status!: ApprovalSupplierStatus;
  public chosen_at?: Date;
  public approved_at?: Date;
  public declined_at?: Date;
  public Supplier?: Supplier;
  public is_final!:boolean;
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
    validate: {
      isIn: [APPROVAL_STATUS_VALUES],
      },  
    },
    chosen_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    declined_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_final: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
