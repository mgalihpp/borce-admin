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
    <div className="w-full flex flex-col items-start gap-8">
      <div className="flex flex-col-reverse lg:flex-row gap-3 max-w-[500px]">
        <div className="flex lg:flex-col gap-2 overflow-auto tailwind-scrollbar-hide">
          {media.map((image, index) => (
            <NextImage
              src={image}
              key={index}
              width={200}
              height={200}
              quality={100}
              alt="sub product image"
              className={`w-20 h-20 rounded-lg object-contain cursor-pointer ${
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
          className="w-96 h-96 rounded-lg shadow-xl object-contain"
        />
      </div>

      {children}
    </div>
  );
};

export default Gallery;
