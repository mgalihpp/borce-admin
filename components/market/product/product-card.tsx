import Link from "next/link";
import React from "react";
import Wishlist from "./wishlist";
import NextImage from "@/components/next-image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface ProductCardProps {
  product: ProductType[];
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  updateSignedInUser,
}) => {
  return (
    <Carousel
      className="max-2xl:max-w-7xl max-xl:max-w-3xl max-lg:max-w-xl max-md:max-w-lg max-sm:max-w-[300px] max-xs:max-w-[200px]"
      opts={{
        loop: false,
      }}
    >
      <CarouselContent className="-ml-8">
        {product.map((product) => (
          <CarouselItem
            key={product._id}
            className="max-sm:basis-full pl-8 max-lg:basis-1/2 max-xl:basis-1/3 xl:basis-1/5"
          >
            {/* <div className="flex w-[230px] flex-col gap-2 px-1 transition-all duration-300 ease-in-out hover:opacity-75"> */}
            <Link
              href={`/products/${product._id}`}
              className="space-y-2 hover:opacity-75"
            >
              <NextImage
                src={product.media[0]}
                alt="product"
                width={300}
                height={300}
                quality={100}
                className="max-h-[300px] min-h-[300px] max-w-[300px] rounded-lg max-sm:object-cover"
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
            {/* </div> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
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
      <NextImage
        src="/no-product.webp"
        alt="no product"
        width={300}
        height={300}
      />
    </div>
  );
};

export default ProductCard;
