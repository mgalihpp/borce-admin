"use server";

import axiosInstance from "@/lib/axios";

export const getProducts = async () => {
  const { data: products } = await axiosInstance.get<ProductType[]>(
    `/api/products`
  );

  return { products };
};

export const getProductDetails = async (productId: string) => {
  const { data: product } = await axiosInstance.get<ProductType>(
    `/api/products/${productId}`
  );

  return { product };
};

export const getRelatedProducts = async (productId: string) => {
  const { data: relatedProducts } = await axiosInstance.get<ProductType[]>(
    `/api/products/${productId}/related`
  );

  return { relatedProducts };
};
