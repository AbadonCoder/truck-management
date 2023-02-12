import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

// Generate a new jwt to authenticate a session
const generateJWT = (data) => jwt.sign({id: data.id, name: data.name, email: data.email}, process.env.JWT_SECRET, { expiresIn: '1d'});

export {
    generateJWT
}