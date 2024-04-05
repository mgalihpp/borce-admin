import mongoose, { InferSchemaType } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: [String],
    category: String,
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    tags: [String],
    sizes: [String],
    colors: [String],
    price: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    expense: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

type TProduct = InferSchemaType<typeof productSchema>;

const Product: mongoose.Model<TProduct> =
  mongoose.models.Product || mongoose.model<TProduct>("Product", productSchema);

export default Product;
