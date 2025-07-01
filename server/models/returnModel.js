import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productId: { 
        type: String,
        required: true 
    },
    returnReason:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        enum:['Good','Moderate','Damaged'],
        required:true
    },
    category: {
        type: String,
        enum: ["Electronics", "Clothing", "Home", "Grocery", "Toys"],
        required: true
    },
    routeTo:{
        type:String,
        enum:['Resale','Refurbish','Recycle/Donate'],
        required:true
    },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Return', returnSchema);