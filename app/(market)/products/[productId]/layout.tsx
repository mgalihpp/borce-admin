import { ProductNotFound } from "@/components/market/product/product-card";
import connectToMongoDB from "@/lib/db";
import Product from "@/lib/db/models/product";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const { productId } = params;

  await connectToMongoDB();

  const product = await Product.findById(productId);

  return {
    title: `${product?.title ?? "Product"}'`,
    description: `${product?.description ?? ""}`,
  };
}

export default async function SingleProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { productId: string };
}) {
  const { productId } = params;

  await connectToMongoDB();

  const product = await Product.findById(productId);

  if (!product) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <ProductNotFound />
      </div>
    );
  }

  return <>{children}</>;
}
