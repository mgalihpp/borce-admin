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
import { cn } from "@/lib/utils";

interface ProductCardProps {
  products: ProductType[];
  updateSignedInUser?: (updatedUser: UserType) => void;
  corousel?: boolean;
  flex?: boolean;
  center?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  products,
  updateSignedInUser,
  corousel = true,
  flex = true,
  center = false,
  className,
}) => {
  return products?.length < 5 || !corousel ? (
    <div
      className={cn(
        "gap-8",
        {
          "flex flex-wrap items-center justify-start": flex,
          "mx-auto grid w-full max-sm:flex max-sm:max-w-sm max-sm:flex-wrap max-sm:items-center max-sm:justify-center sm:grid-cols-2 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3":
            !flex,
          "justify-center": center,
        },
        className,
      )}
    >
      {products?.map((product) => (
        <div key={product._id} className="flex w-[230px] flex-col gap-2 px-1">
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
              className="max-h-[300px] min-h-[300px] max-w-[300px] rounded-lg object-cover max-sm:object-cover"
            />
            <div className="text-start">
              <p className="truncate text-base-bold pb-1">{product.title}</p>
              <p className="text-small-medium capitalize text-grey-3 pb-1">
                {product.category}
              </p>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <p className="text-body-bold">${product.price}</p>
            <Wishlist product={product} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Carousel
      className="xl:max-w-6xl max-xl:max-w-3xl max-lg:max-w-xl max-md:max-w-lg max-sm:max-w-[300px] max-xs:max-w-[200px]"
      opts={{
        loop: false,
      }}
    >
      <CarouselContent className="-ml-8">
        {products?.map((product) => (
          <CarouselItem
            key={product._id}
            className="pl-8 max-xl:basis-1/3 max-lg:basis-1/2 max-sm:basis-full xl:basis-1/4 2xl:basis-1/4"
          >
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
                <p className="truncate text-base-bold">{product.title}</p>
                <p className="text-small-medium capitalize text-grey-3">
                  {product.category}
                </p>
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <p className="text-body-bold">${product.price}</p>
              <Wishlist product={product} />
            </div>
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
