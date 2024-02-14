import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async(req,res,next) =>{
    const {name, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({name, email,password: hashedPassword});
    try{
        await newUser.save(); 
        res.status(201).json({message: "User saved successfully"});
    } catch(error){
        next(error);
    }
};