import express from 'express';
import {
    loginForm,
    createAccount
} from '../controllers/userController.js';

const router = express.Router();

router.get('/login', loginForm);

router.post('/register', createAccount);

export default router;