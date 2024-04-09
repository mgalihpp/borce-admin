"use server";

import axiosInstance from "@/lib/axios";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

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
      shippingRate: {} as Stripe.ShippingRate,
    };

  const shippingRate = await stripe.shippingRates.retrieve(
    data.orders[0]?.shippingRate?.id,
  );

  return {
    orders: data.orders,
    customer: data.customer,
    shippingRate: shippingRate,
  };
};
