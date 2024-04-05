"use client";

import { columns } from "@/components/column/product";
import { DataTable } from "@/components/data-table";
import Loader from "@/components/loader";
import { buttonVariants } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const ProductPage = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductType[]>("/api/products");

      return data;
    },
  });

  return !data ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Link
          className={buttonVariants({
            className: "bg-blue-1 text-white",
          })}
          href="/products/new"
        >
          New Product
        </Link>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
};

export default ProductPage;
