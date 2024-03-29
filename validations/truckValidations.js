import { check, validationResult } from 'express-validator';

// Validate data for a new account
const validateRegister =  async (req) => {

    await Promise.all([
        check('brand').trim().notEmpty().withMessage('Brand is required').run(req),
        check('model').trim().notEmpty().withMessage('Model is required').run(req),
        check('year').trim().notEmpty().withMessage('Year is required').run(req),
        check('plate').trim().isLength({min: 9, max: 9}).withMessage('Plate need to be 9 characters').run(req)
    ]);

    return validationResult(req);
}

export {
    validateRegister
}