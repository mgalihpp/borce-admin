"use server";

import axiosInstance from "@/lib/axios";

export const getCollections = async () => {
  const { data: collections } = await axiosInstance.get<CollectionType[]>(
    `/api/collections`
  );
  return { collections };
};
