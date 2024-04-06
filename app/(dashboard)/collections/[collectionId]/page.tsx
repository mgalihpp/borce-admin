"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import Loader from "@/components/loader";
import CollectionForm from "../_components/form";

const SingleCollectionPage = ({ params }: { params: { collectionId: string } }) => {
  const { data: singleCollection } = useQuery({
    queryKey: ["single-collection", params.collectionId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CollectionType>(
        `/api/collections/${params.collectionId}`
      );

      return data;
    },
  });

  return !singleCollection ? (
    <Loader />
  ) : (
    <CollectionForm initialData={singleCollection} />
  );
};

export default SingleCollectionPage;
