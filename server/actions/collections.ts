"use server";

import axiosInstance from "@/lib/axios";

export const getCollections = async () => {
  const { data: collections } = await axiosInstance.get<CollectionType[]>(
    `${process.env.ADMIN_DASHBOARD_URL}/api/collections`
  );
  return { collections };
};
