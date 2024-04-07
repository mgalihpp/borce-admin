"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ media }: { media: string[] }) => {
  const [mainImage, setMainImage] = useState(media[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product image"
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {media.map((image, index) => (
          <Image
            src={image}
            key={index}
            width={200}
            height={200}
            alt="sub product image"
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
              mainImage === image ? "border-2 border-black" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
