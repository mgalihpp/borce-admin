import NextImage from "@/components/next-image";
import Link from "next/link";
import React from "react";

const NoFound = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <NextImage
            src="/no_product.jpeg"
            alt="no item in cart"
            width={200}
            height={200}
            quality={100}
          />
          <p className="text-base-medium">No item in Cart</p>
          <Link
            href="/products"
            className="inline-flex text-small-normal hover-underline focus:outline-none rounded-lg px-5 py-2.5 text-center dark:focus:ring-primary my-4"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NoFound;
