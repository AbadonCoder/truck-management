import jwt from 'jsonwebtoken';
import { generateJWT } from '../helpers/tokens.js';
import User from '../models/user.js';
import {validateProfile} from '../validations/userValidations.js';

// Load home page
const outputs = (req, res) => {
    const {_token} = req.cookies;

    res.render('manage/manage-outputs', {
        title: 'Outputs',
        csrfToken: req.csrfToken(),
        user: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

// Load profile page
const profile = async (req, res) => {
    const {_token} = req.cookies;

    res.render('manage/profile', {
        title: 'Profile',
        csrfToken: req.csrfToken(),
        user: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

// Change image
const imgProfile = async (req, res, next) => {
    const {_token} = req.cookies;
    const user = jwt.verify(_token, process.env.JWT_SECRET);

    try {
        // Update image user
        await User.findByIdAndUpdate(user.id, {img: req.file.filename});

        // Authenticate user
        user.img = req.file.filename;
        const token = generateJWT({id: user.id, name: user.name, email: user.email, img: user.img});

        // Update current token
        res.cookie('_token', token, {
            httpOnly: true
        });

        next();

    } catch (error) {
        console.error(error);
    }
}

// Change profile data
const updateProfile = async (req, res) => {
    const {_token} = req.cookies;
    const user = jwt.verify(_token, process.env.JWT_SECRET);
    let errors = await validateProfile(req);

    if(!errors.isEmpty()) {
        return res.render('manage/profile', {
            title: 'Profile',
            csrfToken: req.csrfToken(),
            errors: errors.array(),
            user
        });
    }

    try {
        // Update name
        await User.findByIdAndUpdate(user.id, {name: req.body.name});

        // Authenticate user
        user.name = req.body.name;
        const token = generateJWT({id: user.id, name: user.name, email: user.email, img: user.img});

        // Update current token
        res.cookie('_token', token, {
            httpOnly: true
        });
        
        res.redirect('/manage/profile');
    } catch (error) {
        console.error(error);
    }
}

export {
    outputs,
    profile,
    imgProfile,
    updateProfile
}