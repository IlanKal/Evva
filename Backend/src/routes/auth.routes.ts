import { Router } from 'express';
import { login, logout, refreshToken, registerUser, registerSupplier, registerSupplierDetails} from '../controllers/auth.controller';
import validateRegisterUser from '../middlewares/validateRegisterUser';
import validateRegisterSupplier from '../middlewares/validateRegisterSupplier';
import validateRegisterSupplierDetails from '../middlewares/validateRegisterSupplierDetails';


const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/register-user', validateRegisterUser, registerUser);
router.post('/register-supplier', validateRegisterSupplier, registerSupplier);
router.post('/register-supplier-details', validateRegisterSupplierDetails, registerSupplierDetails);


export default router;
