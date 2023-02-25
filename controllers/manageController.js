import jwt from 'jsonwebtoken';
import { generateJWT } from '../helpers/tokens.js';
import User from '../models/user.js';
import Truck from '../models/truck.js';
import {validateProfile} from '../validations/userValidations.js';
import {validateRegister} from '../validations/truckValidations.js';

// Load home page
const outputs = (req, res) => {
    const {_token} = req.cookies;

    res.render('manage/manage-outputs', {
        title: 'Outputs',
        csrfToken: req.csrfToken(),
        session: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

// Outputs form
const outputsForm = (req, res) => {
    const {_token} = req.cookies;

    res.render('manage/add-output', {
        title: 'Add Output',
        csrfToken: req.csrfToken(),
        session: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

// Outputs form
const trucksForm = (req, res) => {
    const {_token} = req.cookies;

    res.render('manage/add-truck', {
        title: 'Add Truck',
        csrfToken: req.csrfToken(),
        session: jwt.verify(_token, process.env.JWT_SECRET)
    });
}

// Manage Trucks
const trucks = async (req, res) => {
    const {_token} = req.cookies;

    try {
        const trucks = await Truck.find();

        res.render('manage/manage-trucks', {
            title: 'Trucks',
            csrfToken: req.csrfToken(),
            session: jwt.verify(_token, process.env.JWT_SECRET),
            trucks
        });
    } catch (error) {
        console.log(error);
    }

}

// Save a new truck
const addTruck = async (req, res) => {
    const {_token} = req.cookies;
    const {plate} = req.body;

    let errors = await validateRegister(req);

    if(!errors.isEmpty()) {
        return res.render('manage/add-truck', {
            title: 'Add Truck',
            csrfToken: req.csrfToken(),
            errors: errors.array(),
            session: jwt.verify(_token, process.env.JWT_SECRET)
        });
    }

    const truck = await Truck.findOne({plate});

    if(truck) {
        return res.render('manage/add-truck', {
            title: 'Add Truck',
            csrfToken: req.csrfToken(),
            errors: [{msg: 'This plate is alredy registered'}],
            session: jwt.verify(_token, process.env.JWT_SECRET)
        });
    }

    try {
        const truck = new Truck(req.body);
        await truck.save();
        res.redirect('/manage/manage-trucks');
    } catch (error) {
        console.error(error);
    }
}

// Delete Truck
const deleteTruck = async (req, res) => {
    const {id} = req.params;

    try {
        await Truck.findByIdAndRemove(id);
        res.status(200).json({msg: 'Your truck has been deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'It couldn\'t delete the truck'});
    }

}

// Form update truck
const updateTruckForm = async (req, res) => {
    
    const {id} = req.params;
    
    try {
        const truck = await Truck.findById(id, '-__v -_id');
        res.status(200).json(truck);
    } catch (error) {
        res.status(400).json({msg: 'This truck doesn\'t exists'});
    }
}

// Form update truck
const updateTruck = async (req, res) => {
    
    try {    
        const {id} = req.params;

        let errors = await validateRegister(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        await Truck.findByIdAndUpdate(id, req.body);
        res.status(200).json({msg: 'Your truck has been upgraded.'});

    } catch (errors) {
        res.status(400).json(errors);
    }
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
    outputsForm,
    trucksForm,
    trucks,
    addTruck,
    deleteTruck,
    updateTruckForm,
    updateTruck,
    profile,
    imgProfile,
    updateProfile
}