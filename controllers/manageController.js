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
        session: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

// Load profile page
const profile = async (req, res) => {
    const {_token} = req.cookies;

    res.render('manage/profile', {
        title: 'Profile',
        csrfToken: req.csrfToken(),
        session: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

// Change image
const imgProfile = async (req, res, next) => {
    const {_token} = req.cookies;
    const session = jwt.verify(_token, process.env.JWT_SECRET);

    try {
        // Update image user
        await User.findByIdAndUpdate(session.id, {img: req.file.filename});

        // Authenticate user
        session.img = req.file.filename;
        const token = generateJWT({id: session.id, name: session.name, email: session.email, img: session.img});

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
    const session = jwt.verify(_token, process.env.JWT_SECRET);
    let errors = await validateProfile(req);

    if(!errors.isEmpty()) {
        return res.render('manage/profile', {
            title: 'Profile',
            csrfToken: req.csrfToken(),
            errors: errors.array(),
            session
        });
    }

    try {
        // Update name
        await User.findByIdAndUpdate(session.id, {name: req.body.name});

        // Authenticate user
        session.name = req.body.name;
        const token = generateJWT({id: session.id, name: session.name, email: session.email, img: session.img});

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