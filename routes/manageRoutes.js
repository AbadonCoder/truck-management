import express from 'express';
import { outputs } from '../controllers/manageController.js';
import routeProtect from '../middlewares/routeProtection.js';


const router = express.Router();

router.get('/manage-outputs', routeProtect, outputs);

export default router;