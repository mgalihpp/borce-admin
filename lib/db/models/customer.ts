import mongoose, { InferSchemaType } from "mongoose";

const customerSchema = new mongoose.Schema({
  customerId: String,
  name: String,
  email: String,
  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
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

type TCustomer = InferSchemaType<typeof customerSchema>;

const Customer: mongoose.Model<TCustomer> =
  mongoose.models.Customer ||
  mongoose.model<TCustomer>("Customer", customerSchema);

export default Customer;
