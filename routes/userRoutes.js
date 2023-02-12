import express from 'express';
import {
    loginForm,
    login,
    logout,
    createAccount
} from '../controllers/userController.js';

const router = express.Router();

router.get('/login', loginForm);
router.post('/login', login);

router.post('/logout', logout);

router.post('/register', createAccount);

export default router;