import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

// Define the shape of the model attributes
export interface GuestAttributes {
  guest_id?: number;
  event_id: number;
  full_name: string;
  phone?: string;
  email: string;
  rsvp?: boolean | null;
}

export type GuestCreationAttributes = Optional<GuestAttributes, 'guest_id' | 'phone' | 'rsvp'>;

class Guest extends Model<GuestAttributes, GuestCreationAttributes> implements GuestAttributes {
  public guest_id!: number;
  public event_id!: number;
  public full_name!: string;
  public email!: string;
  public phone?: string;
  public rsvp?: boolean | null;
}

Guest.init(
  {
    guest_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: DataTypes.STRING(20),
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rsvp: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'Guest',
    tableName: 'guests',
    timestamps: false,
  }
);

export default Guest;
