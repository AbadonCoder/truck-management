import { check, validationResult } from 'express-validator';
import { validateRegister } from '../validations/userValidations.js';
import User from '../models/user.js';

const loginForm = (req, res) => {
    res.render('auth/login', {
        title: 'My app'
    });
}

// Create user
const createAccount = async (req, res) => {
    
    const data = req.body;

    // Validations
    let errors = await validateRegister(req);

    if(!errors.isEmpty()) {
        return res.render('auth/register', {
            title: 'My app',
            errors: errors.array()
        });
    }

    // Create new user
    try {
        const user = new User(data);
        await user.save();

        res.json({msg: 'User has been created', user});
    } catch (error) {
        res.status(500).json(error);
    }

}

export {
    loginForm,
    createAccount
}