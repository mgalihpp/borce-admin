"use client"

import { columns } from "@/components/admin/column/order";
import { DataTable } from "@/components/admin/data-table";
import Loader from "@/components/admin/loader";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const OrderPage = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/orders");

      return data;
    },
  });

  return !data ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={data} searchKey="_id" />
    </div>
  );
};

export default OrderPage;
