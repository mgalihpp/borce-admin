"use server";

import axiosInstance from "@/lib/axios";

interface OrderResponse {
  orders: OrderType[];
  customer: CustomerType;
}

export const getOrders = async (userId: string) => {
  const { data } = await axiosInstance.get<OrderResponse>(
    `/api/orders/customers/${userId}`,
  );

  if (data.orders.length === 0)
    return {
      orders: [] as OrderType[],
      customer: data.customer,
    };

  return {
    orders: data.orders,
    customer: data.customer,
  };
};
