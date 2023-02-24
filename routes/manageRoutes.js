import express from 'express';
import { 
    outputs, 
    outputsForm,
    trucks,
    trucksForm,
    addTruck,
    deleteTruck,
    profile, 
    imgProfile, 
    updateProfile} from '../controllers/manageController.js';
import routeProtect from '../middlewares/routeProtection.js';
import upload from '../middlewares/saveImage.js';

const router = express.Router();

// Get outputs page
router.get('/manage-outputs', routeProtect, outputs);

// Outputs
router.get('/add-output', routeProtect, outputsForm);

// Trucks
router.get('/manage-trucks', routeProtect, trucks);

// Add trucks
router.get('/add-truck', routeProtect, trucksForm);
router.post('/add-truck', routeProtect, addTruck);

// Manipulate trucks
router.get('/delete-truck/:id', routeProtect, deleteTruck);

// Get user profile
router.get('/profile', routeProtect, profile);
// Update image
router.post('/profile', routeProtect, upload.single('image'), imgProfile);
// Update user data
router.post('/profile/:id', routeProtect, updateProfile);

export default router;