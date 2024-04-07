"use server";

import axiosInstance from "@/lib/axios";

export const getProducts = async () => {
  const { data: products } = await axiosInstance.get<ProductType[]>(
    `${process.env.ADMIN_DASHBOARD_URL}/api/products`
  );

  return { products };
};

export const getProductDetails = async (productId: string) => {
  const { data: product } = await axiosInstance.get<ProductType>(
    `${process.env.ADMIN_DASHBOARD_URL}/api/products/${productId}`
  );

  return { product };
};
