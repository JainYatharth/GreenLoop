import mongoose from "mongoose"

const returnSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  returnReason: {
    type: String,
    default: "",
    required: false,
  },
  condition: {
    type: String,
    enum: ["Good", "Moderate", "Damaged"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Electronics", "Grocery", "Home & Kitchen", "Toys", "Beauty"],
    required: true,
  },
  routeTo: {
    type: String,
    enum: ["Resale", "Refurbish", "Recycle", "Donate", "Discard"],
    required: true,
  },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Return", returnSchema)
