"use client"

import { columns } from "@/components/admin/column/collection";
import { DataTable } from "@/components/admin/data-table";
import Loader from "@/components/admin/loader";
import { buttonVariants } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CollectionPage() {
  const { data } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/collections");

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
          href="/dashboard/collections/new"
        >
          <Plus className="size-4 mr-2" />
          New Collection
        </Link>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
}
