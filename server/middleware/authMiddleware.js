import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect= async(req,res,next)=>{
    try{
        let token=null;
        if(req.cookies && req.cookies.token){
            token=req.cookies.token;
        }
        
        if(!token){
            return res.status(401).json({
                success: false,
                message:'Not authorized, token missing'
            });
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({
                success:false,
                message:'Not authorized,user not found'
            });
        }
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:'Not authorized, token invalid'
        });
    }
};