import { validateRegister, validateLogin } from '../validations/userValidations.js';
import User from '../models/user.js';
import { generateJWT, generateID } from '../helpers/tokens.js';
import { registerEmail } from '../helpers/email.js';

// Login Form
const loginForm = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        csrfToken: req.csrfToken()
    });
}

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    let errors = await validateLogin(req);

    if(!errors.isEmpty()) {
        return res.render('auth/login', {
            title: 'Login',
            errors: errors.array(),
            csrfToken: req.csrfToken()
        });
    }

    // Verify if user exists
    const user = await User.findOne({email, status:true});
    if(!user) {
        return res.render('auth/login', {
            title: 'Login',
            errors: [{msg:'This email doesn\'t exists'}],
            csrfToken: req.csrfToken()
        });
    }

    // Check if the passwords match
    if(!user.validatePassword(password)) {
        return res.render('auth/login', {
            title: 'Login',
            errors: [{msg:'Password Incorrect'}],
            csrfToken: req.csrfToken()
        });
    }

    // Authenticate user
    const token = generateJWT({id: user.id, name: user.name, email});
    
    return res.cookie('_token', token, {
        httpOnly: true
    }).redirect('/manage/manage-outputs');
}

// Logout
const logout = (req, res) => {
    // Clean the cookie and redirect
    res.clearCookie('_token').status(200).redirect('/auth/login');
}

// Create user
const createAccount = async (req, res) => {  
    const data = req.body;
    const { name, email, password } = data;

    // Validations
    let errors = await validateRegister(req);

    // If find errors return errors array
    if(!errors.isEmpty()) {
        return res.render('auth/register', {
            title: 'Register',
            errors: errors.array(),
            csrfToken: req.csrfToken()
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
            },
            csrfToken: req.csrfToken()
        });
    }

    // Create new user
    const user = new User({
        name,
        email,
        password,
        token: generateID()
    });

    try {
        await user.save();

        // Confirm account
        registerEmail({
            name: user.name,
            email: user.email,
            token: user.token
        });

        res.render('templates/message', {
            title: 'Account created',
            msg: 'We have been sended a confirmation email'
        });
    } catch (error) {
        res.status(500).json(error);
    }

}

// validate account
const confirm = async (req, res) => {
    const {token} = req.params;

    // Verify if token is valid
    const user = await User.findOne({token});

    if(!user) {
        return res.render('auth/confirm-account', {
            title: 'Error',
            msg: 'This token is invalid',
            error: true
        });
    }

    try {
        // Confirm account
        user.token = null;
        user.status = true;
        await user.save();
    
        return res.render('auth/confirm-account', {
            title: 'Account Confirmed',
            msg: 'Your account has been confirmed'
        });
    } catch (error) {
        console.error('Something goes wrong');
    }
}

export {
    loginForm,
    login,
    createAccount,
    confirm,
    logout
}