import express from 'express';
import { authorizeAdmin } from '../middleware/authorization.js';
import {
	createUser,
	signInUser,
	getUsers
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', authorizeAdmin, getUsers);
router.post('/sign-up', createUser);
router.post('/sign-in', signInUser);

export default router;
