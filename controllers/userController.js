import { validateRegister } from '../validations/userValidations.js';
import User from '../models/user.js';

const loginForm = (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    });
}

// Create user
const createAccount = async (req, res) => {  
    const data = req.body;
    const { name, email } = data;

    // Validations
    let errors = await validateRegister(req);

    // If find errors return errors array
    if(!errors.isEmpty()) {
        return res.render('auth/register', {
            title: 'Register',
            errors: errors.array()
        });
    }

    // Verify if the email exists
    const existsUser = await User.findOne({email: data.email});
    
    if(existsUser) {
        return res.render('auth/register', {
            title: 'Register',
            errors: [{msg: 'This email alredy exists'}],
            user: {
                name,
                email
            }
        });
    }

    // Create new user
    try {
        const user = new User(data);
        await user.save();

        res.redirect('/auth/login');
    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    loginForm,
    createAccount
}