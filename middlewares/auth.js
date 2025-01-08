import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config()

export const authN=(req,res,next)=>{
    try {
        const token=req.body.token
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"Token missing!"
            })
        }
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user=decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Token is invalid"
        })
    }
    next();
} 

export const isAdmin=(req,res,next)=>{
    try {
        if (req.user.role!=="Admin") {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`User role is not matching,${error.message}`
        })
    }
}
