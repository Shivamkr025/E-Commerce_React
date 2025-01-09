import express from  'express';
import { adminLogin, adminLogout, adminRegistration, deleteAdminAccount, updateAdminDetails, viewAllAdmin} from "../controller/adminController.js";
import { validate } from '../middleware/validator.js';
import { userRegistrationSchema } from '../middleware/validation.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

router.post('/admin/registration', validate(userRegistrationSchema), adminRegistration);

router.post('/admin/login', adminLogin);

router.get('/all/admin', verifyToken, viewAllAdmin);

router.put('/update/admin', verifyToken, updateAdminDetails);

router.delete('/delete/admin', verifyToken, deleteAdminAccount);

router.post('/logout/admin', adminLogout);

export default router