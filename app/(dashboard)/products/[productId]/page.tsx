"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import Loader from "@/components/loader";
import ProductForm from "../_components/form";

const SingleProductPage = ({ params }: { params: { productId: string } }) => {
  const { data: singleProduct } = useQuery({
    queryKey: ["single-product", params.productId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductType>(
        `/api/products/${params.productId}`
      );

      return data;
    },
  });

  return !singleProduct ? (
    <Loader />
  ) : (
    <ProductForm initialData={singleProduct} />
  );
};

export default SingleProductPage;
