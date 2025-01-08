import express from 'express'
const router=express.Router()

import { signup,login } from '../controllers/authController.js'
import { authN,isAdmin } from '../middlewares/auth.js';
router.post('/signup',signup);
router.post('/login',login);
router.get("/admin",authN,isAdmin,(req,res)=>{
    res.json({
        success:true,
        "message":"Welcome to protected route for Admin"
    })
})

export default router