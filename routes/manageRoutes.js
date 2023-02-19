import express from 'express';
import { 
    outputs, 
    profile, 
    imgProfile, 
    updateProfile} from '../controllers/manageController.js';
import routeProtect from '../middlewares/routeProtection.js';
import upload from '../middlewares/saveImage.js';

const router = express.Router();

// Get outputs page
router.get('/manage-outputs', routeProtect, outputs);

// Get user profile
router.get('/profile', routeProtect, profile);
// Update image
router.post('/profile', routeProtect, upload.single('image'), imgProfile);
// Update user data
router.post('/profile/:id', routeProtect, updateProfile);

export default router;