"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface imageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  onClick?: () => void;
}

const NextImage: React.FC<imageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  quality,
  onClick,
}) => {
  const [isImageLoading, setImageLoading] = React.useState(true);

  return (
    <div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fetchPriority="high"
        quality={quality}
        loading="lazy"
        fill={!width || !height}
        onLoad={() => setImageLoading(false)}
        onClick={() => onClick?.()}
        className={cn(
          "h-full w-full object-cover object-center",
          {
            blur: isImageLoading,
            "remove-blur": !isImageLoading,
          },
          className,
        )}
      />
    </div>
  );
};

export default NextImage;
