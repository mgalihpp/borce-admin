"use server";

import axiosInstance from "@/lib/axios";

export const getCoupons = async () => {
  const { data: coupons } =
    await axiosInstance.get<CouponType[]>("/api/coupons");

  return { coupons };
};
