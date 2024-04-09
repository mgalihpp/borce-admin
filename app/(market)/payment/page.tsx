"use client";

import useCart from "@/store/use-cart";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessfulPayment({
  searchParams,
}: {
  searchParams: {
    success: string;
    token: string;
  };
}) {
  const { clear } = useCart();

  //   useEffect(() => {
  //     clear;
  //   }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <p className="text-heading4-bold text-blue-1">Payment Successfully</p>
      <p>Thank you for your purchase</p>
      <Link
        href="/"
        className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-small-normal underline-offset-2 hover:underline focus:outline-none dark:focus:ring-primary"
      >
        Back to Shopping
      </Link>
    </div>
  );
}
