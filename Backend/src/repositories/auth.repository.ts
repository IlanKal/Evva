import User from '../models/User';
import Supplier from '../models/Supplier';
import { Weekday } from '../constants/weekdays';
import { Region } from '../constants/regions';
import Catering from '../models/Catering';
import DJ from '../models/DJ';
import Photographer from '../models/Photographer';
import Speaker from '../models/Speaker';
import Location from '../models/Location';


type AuthUser = {
  id: number;
  email: string;
  password: string;
};

export const findUserByEmailAndType = async (
  email: string,
  type: 'user' | 'supplier'
): Promise<AuthUser | null> => {
  if (type === 'user') {
    const user = await User.findOne({
      where: { email },
      attributes: [['user_id', 'id'], 'email', 'password'],
    });

    return user ? user.get({ plain: true }) as unknown as AuthUser : null;
  }

  if (type === 'supplier') {
    const supplier = await Supplier.findOne({
      where: { email },
      attributes: [['supplier_id', 'id'], 'email', 'password'],
    });

    return supplier ? supplier.get({ plain: true }) as unknown as AuthUser : null;
  }

  return null;
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const createUser = async ({
  full_name,
  email,
  password,
  phone,
}: {
  full_name: string;
  email: string;
  password: string;
  phone: string;
}): Promise<{ user_id: number }> => {
  const user = await User.create({
    full_name,
    email,
    password,
    phone,
  });

  return user.get({ plain: true }) as { user_id: number };
};

export const findSupplierByEmail = async (email: string) => {
  const supplier = await Supplier.findOne({
    where: { email },
    attributes: ['supplier_id', 'email'],
  });

  return supplier ? supplier.get({ plain: true }) : null;
};

export const createSupplier = async ({
  name,
  email,
  password,
  available_days,
  region,
  contact_info,
  supplier_type,
  image_url,
  additional_info,
}: {
  name: string;
  email: string;
  password: string;
  available_days: string[];
  region: string;
  contact_info: string;
  supplier_type: 'catering' | 'dj' | 'photographer' | 'speaker' | 'location';
  image_url?: string;
  additional_info?: string;
}): Promise<{ supplier_id: number }> => {
  const validDays = available_days.filter((day): day is Weekday =>
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(day)
  );

  const validRegion = ['North', 'Center', 'South', 'All'].includes(region)
    ? (region as Region)
    : 'All';

  const supplier = await Supplier.create({
    name,
    email,
    password,
    available_days: validDays,
    region: validRegion,
    contact_info,
    supplier_type,
    image_url,          
    additional_info
  });

  return supplier.get({ plain: true }) as { supplier_id: number };
};

export const saveSupplierDetails = async (
  supplier_id: number,
  supplier_type: 'catering' | 'dj' | 'photographer' | 'speaker' | 'location',
  details: any
) => {
  switch (supplier_type) {
    case 'catering':
      await Catering.create({ supplier_id, ...details });
      break;

    case 'dj':
      await DJ.create({ supplier_id, ...details });
      break;

    case 'photographer':
      await Photographer.create({ supplier_id, ...details });
      break;

    case 'speaker':
      await Speaker.create({ supplier_id, ...details });
      break;

    case 'location':
      await Location.create({ supplier_id, ...details });
      break;

    default:
      throw new Error('Unsupported supplier type');
  }
};





