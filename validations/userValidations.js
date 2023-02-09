import { check, validationResult } from 'express-validator';

const validateRegister = async (req) => {
    
    // const {name, email, password, repeat_password} = data;

    await check('name').trim().notEmpty().escape().withMessage('Name is required').run(req);
    await check('email').trim().isEmail().normalizeEmail().withMessage('Invalid email').run(req);
    await check('password').isLength({ min: 8 }).withMessage('Password needs a minimum of 8 characters').run(req);
    await check('repeat_password').equals(req.body.password).withMessage('Password doesn\'t match ').run(req);

    let errors = validationResult(req);

    return errors;
}

export {
    validateRegister
}