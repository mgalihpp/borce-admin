"use server";

import axiosInstance from "@/lib/axios";
import connectToMongoDB from "@/lib/db";
import Product from "@/lib/db/models/product";

export const getProducts = async () => {
  const { data: products } =
    await axiosInstance.get<ProductType[]>(`/api/products`);

  return { products };
};

export const getProductDetails = async (productId: string) => {
  const { data: product } = await axiosInstance.get<ProductType>(
    `/api/products/${productId}`,
  );

  return { product };
};

export const getRelatedProducts = async (productId: string) => {
  const { data: relatedProducts } = await axiosInstance.get<ProductType[]>(
    `/api/products/${productId}/related`,
  );

  return { relatedProducts };
};

export const getAllProductsCategory = async () => {
  try {
    await connectToMongoDB();
    const categories = await Product.distinct("category");

    return { categories };
  } catch (error) {
    return {
      error: "Failed to get products category.",
    };
  }
};

export const getAllProductsColor = async () => {
  try {
    await connectToMongoDB();
    const colors = await Product.distinct("colors");

    return { colors };
  } catch (error) {
    return {
      error: "Failed to get products category.",
    };
  }
};

export const getAllProductsSize = async () => {
  try {
    await connectToMongoDB();
    const sizes = await Product.distinct("sizes");

    return { sizes };
  } catch (error) {
    return {
      error: "Failed to get products category.",
    };
  }
};
