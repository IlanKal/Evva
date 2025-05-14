import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import RsvpStatus from '../types/RsvpStatus';

export interface GuestAttributes {
  guest_id?: number;
  event_id: number;
  full_name: string;
  phone?: string;
  email: string;
  rsvp?: RsvpStatus;
  has_rated?: boolean;
}

export type GuestCreationAttributes = Optional<GuestAttributes, 'guest_id' | 'phone' | 'rsvp'>;

class Guest extends Model<GuestAttributes, GuestCreationAttributes> implements GuestAttributes {
  public guest_id!: number;
  public event_id!: number;
  public full_name!: string;
  public email!: string;
  public phone?: string;
  public rsvp?: RsvpStatus;
  public has_rated?: boolean;
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING',
      validate: {
        isIn: [['PENDING', 'APPROVED', 'REJECTED']],
      },
    },
    has_rated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
