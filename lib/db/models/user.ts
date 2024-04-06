import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  customerId: String,
  wishlist: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

type TUser = InferSchemaType<typeof userSchema>;

const User: mongoose.Model<TUser> =
  mongoose.models.User || mongoose.model<TUser>("User", userSchema);

export default User;
