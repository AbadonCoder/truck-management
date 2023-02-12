import express from 'express';
import {
    loginForm,
    login,
    createAccount,
    confirm,
    logout
} from '../controllers/userController.js';

const router = express.Router();

router.get('/login', loginForm);
router.post('/login', login);

router.post('/register', createAccount);

router.get('/confirm/:token', confirm);

router.post('/logout', logout);

export default router;