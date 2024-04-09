"use client";

import NextImage from "@/components/next-image";
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

    useEffect(() => {
      clear();
    }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <NextImage
            src="/thanks.png"
            alt="thanks for purchasing"
            width={350}
            height={400}
            quality={100}
          />
          <p className="text-base-medium">Thanks for Purchasing!</p>
          <p className="text-xs mt-1">Product will be delivery soon...</p>
          <div className="flex items-center justify-between">
            <Link
              href="/orders"
              className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-small-normal hover-underline focus:outline-none dark:focus:ring-primary"
            >
              Check Orders
            </Link>
            <Link
              href="/products"
              className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-small-normal hover-underline focus:outline-none dark:focus:ring-primary"
            >
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
