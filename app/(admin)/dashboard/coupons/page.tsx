"use client";

import { columns } from "@/components/admin/column/coupon";
import { DataTable } from "@/components/admin/data-table";
import Loader from "@/components/loader";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { stripe } from "@/lib/stripe";
import { useQuery } from "@tanstack/react-query";
import { TicketPlus } from "lucide-react";
import Link from "next/link";

export default function CouponPage() {
  const { data } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const { data } = await stripe.promotionCodes.list();

      return data;
    },
  });

  return !data ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Coupons</p>
        <Link
          className={buttonVariants({
            className: "bg-blue-1 text-white",
          })}
          href="/dashboard/coupons/new"
        >
          <TicketPlus className="mr-2 size-4" />
          New Ticket
        </Link>
      </div>
      <Separator className="my-5" />
      <DataTable columns={columns} data={data} searchKey="code" />
    </div>
  );
}
