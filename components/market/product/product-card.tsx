import Link from "next/link";
import React from "react";
import Wishlist from "./wishlist";
import NextImage from "@/components/next-image";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  updateSignedInUser,
}) => {
  return (
    <div className="flex w-[230px] flex-col gap-2 px-1 transition-all duration-300 ease-in-out hover:scale-105">
      <Link href={`/products/${product._id}`} className="space-y-2">
        <NextImage
          src={product.media[0]}
          alt="product"
          width={220}
          height={300}
          className="max-h-[300px] min-h-[300px] max-w-[220px] rounded-lg object-cover"
        />
        <div>
          <p className="text-base-bold">{product.title}</p>
          <p className="text-small-medium capitalize text-grey-3">
            {product.category}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <p className="text-body-bold">${product.price}</p>
        <Wishlist product={product} />
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return Array.from({ length: 6 }, (_, index) => (
    <Skeleton key={index} className="h-[300px] w-[220px]" />
  ));
};

export const ProductNotFound = () => {
  return (
    <div>
      {/* <h2 className="text-center">Product Not Found</h2>
      <p>
        We&apos;re sorry, but the product you&apos;re looking for cannot be
        found.
      </p> */}
      <NextImage src="/no-product.webp" alt="no product" width={300} height={300} />
    </div>
  );
};

export default ProductCard;
