import express from 'express';
import {
    loginForm,
    login,
    createAccount
} from '../controllers/userController.js';

const router = express.Router();

router.get('/login', loginForm);
router.post('/login', login);

router.post('/register', createAccount);

export default router;