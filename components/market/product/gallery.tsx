"use client";

import NextImage from "@/components/next-image";
import React, { ReactNode, useState } from "react";

const Gallery = ({
  media,
  children,
}: {
  media: string[];
  children: ReactNode;
}) => {
  const [mainImage, setMainImage] = useState(media[0]);

  return (
    <div className="flex w-full flex-col items-start gap-8">
      <div className="flex max-w-[500px] flex-col-reverse gap-3 lg:flex-row">
        <div className="tailwind-scrollbar-hide flex max-md:max-w-xs gap-2 overflow-auto lg:flex-col">
          {media.map((image, index) => (
            <NextImage
              src={image}
              key={index}
              width={200}
              height={200}
              quality={100}
              alt="sub product image"
              className={`h-20 w-20 cursor-pointer rounded-lg object-contain max-md:min-h-20 max-md:min-w-20 ${
                mainImage === image ? "border-2 border-black" : ""
              }`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
        <NextImage
          src={mainImage}
          width={500}
          height={500}
          quality={100}
          alt="product image"
          className="w-96 h-96 rounded-lg object-contain shadow-xl"
        />
      </div>

      {children}
    </div>
  );
};

export default Gallery;
