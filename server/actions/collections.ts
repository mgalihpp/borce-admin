"use server";

import axiosInstance from "@/lib/axios";

export const getCollections = async () => {
  const { data: collections } = await axiosInstance.get<CollectionType[]>(
    `/api/collections`
  );
  return { collections };
};

export const getCollectionDetails = async (collectionId: string) => {
  const { data: collection } = await axiosInstance.get<CollectionType>(
    `/api/collections/${collectionId}`
  );

  return { collection };
};
