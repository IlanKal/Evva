import User from '../models/User';
import Supplier from '../models/Supplier';

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
