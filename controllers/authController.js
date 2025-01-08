import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const signup=async(req,res)=>{
    try {
        const {name,email,password,phoneNumber,city,state,country,position,role}=req.body
        if (!name || !email || !password || !phoneNumber || !city || !state || !country || !position || !role) {
                 return res.status(400).json({
                    success:false,
                    message:"enter the missing field"
                 })
        }
        const registeredUser=await User.findOne({email});
        if (registeredUser) {
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            })
        
        }
        let hashedPassword;
        try {
            hashedPassword=await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'Password not hashed'
            })
        }
        const newUser=await User.create({name,email,password:hashedPassword,role});
        return res.status(200).json({
            success:true,
            message:"User signed in successfully",
            user:newUser
        }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Error is,${error}`
        })
    }
   
}

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Fill the missing fields"
            })
        }
        let existingUser=await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({
                success:false,
                message:"You need to register first"
            })            
        }
        const payload={
            email:existingUser.email,
            id:existingUser._id,
            role:existingUser.role,
            name:existingUser.name
        }
        if (bcrypt.compare(password,existingUser.password)) {
            let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2d"})
             existingUser=existingUser.toObject();
            existingUser.token=token;
            existingUser.password=undefined;
            console.log(existingUser);
            return res.status(200).json({
                success:true,
                message:"User logged in Successfully",
                user:existingUser,
                token
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Login Fail!, error is, ${error}`
        })
    }
}