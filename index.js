import express from 'express';
import userRoutes from './routes/userRoutes.js';
import {dbConnection} from './database/config.js';
import * as dotenv from 'dotenv';
dotenv.config();

// Create express application
const app = express();

app.use(express.urlencoded({extended: true}));

// DB connection
dbConnection();

// Enable static files
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'pug');

// Set application views
app.set('views', './views');

// Routing
app.use('/auth', userRoutes);

// server port
const port = process.env.PORT;

// Listen port 8080
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});