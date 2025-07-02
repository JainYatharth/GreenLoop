import Return from "../models/returnModel.js";

const determineRoute = (condition) =>{
    if(condition=='Good')return "Resale";
    if(condition=="Moderate")return "Refurbish";
    return "Recycle";
};

export const createReturn = async(req,res) =>{
    try{
        const {productName,productId,reason,condition,category}=req.body;
        const routeTo =determineRoute(condition);
        const returnItem=new Return({
            user:req.user._id,
            productName,
            productId,
            reason,
            condition,
            category,
            routeTo
        });
        await returnItem.save();
        res.status(201).json({success:true,message:"Return created",return:returnItem});
    }catch(err){
        res.status(500).json({success:false,message:"Failed to create return",error:err.message});
    }
};