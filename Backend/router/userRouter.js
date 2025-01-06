import express from 'express';
import { registerUser, loginUser, viewUser, updateDetails, deleteAccount, logoutUser} from '../controller/user.js';
import { verifyToken } from '../middleware/auth.js';
import { userRegistrationSchema } from '../middleware/validation.js';
import { validate } from '../middleware/validator.js';

const router = express.Router()

router.post('/register/user',validate(userRegistrationSchema), registerUser )

router.post('/login/user/e-shop', loginUser)

router.get('/user/details',verifyToken, viewUser)

router.post('/update/details', verifyToken, updateDetails)

router.delete('/delete/user/account',verifyToken, deleteAccount)

router.post('/logout/user', logoutUser)

export default router