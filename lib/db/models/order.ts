import mongoose, { InferSchemaType } from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      color: String,
      size: String,
      quantity: Number,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  shippingRate: String,
  totalAmmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type TOrder = InferSchemaType<typeof orderSchema>;

const Order: mongoose.Model<TOrder> =
  mongoose.models.Order || mongoose.model<TOrder>("Order", orderSchema);

export default Order;
