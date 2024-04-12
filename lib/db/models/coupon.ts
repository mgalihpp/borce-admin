import mongoose, { InferSchemaType } from "mongoose";

const couponSchema = new mongoose.Schema({
  code: String,
  description: {
    type: String,
    required: false,
  },
  listUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  isLimit: {
    type: Boolean,
    required: false,
  },
  limit: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type TCoupon = InferSchemaType<typeof couponSchema>;

const Coupon: mongoose.Model<TCoupon> =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;
