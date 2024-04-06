"use server";

import axiosInstance from "@/lib/axios";

export const getProducts = async () => {
  const { data: products } = await axiosInstance.get<ProductType[]>(
    `${process.env.ADMIN_DASHBOARD_URL}/api/products`
  );

  return { products };
};
