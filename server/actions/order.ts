"use server";

import axiosInstance from "@/lib/axios";

export const getOrders = async (userId: string) => {
  const {data: orders} = await axiosInstance.get(`/api/orders/customers/${userId}`);

  return { orders };
};
