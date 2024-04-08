import NextImage from "@/components/next-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getCollections } from "@/server/actions/collections";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const { collections } = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 px-5 py-8">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <Carousel
          className="max-xl:max-w-3xl max-lg:max-w-xl max-md:max-w-lg max-sm:max-w-[300px] max-xs:max-w-[200px] xl:max-w-6xl"
          opts={{
            loop: false,
          }}
        >
          <CarouselContent className="-ml-8">
            {collections.map((collection) => (
              <CarouselItem
                key={collection._id}
                className="pl-8 max-xl:basis-1/3 max-lg:basis-1/2 max-sm:basis-full xl:basis-1/4"
              >
                <Link
                  href={`/collections/${collection._id}`}
                  className="hover:opacity-75"
                >
                  <NextImage
                    src={collection.image}
                    alt={collection.title}
                    width={350}
                    height={200}
                    quality={100}
                    className="max-h-[200px] min-h-[200px] max-w-[350px] cursor-pointer rounded-lg object-cover max-sm:min-w-[200px]"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default Collections;
