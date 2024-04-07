import Link from "next/link";
import React from "react";
import Wishlist from "./wishlist";
import NextImage from "@/components/next-image";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  updateSignedInUser,
}) => {
  return (
    <div className="w-[230px] flex flex-col px-1 gap-2 hover:scale-105 transition-all duration-300 ease-in-out">
      <Link href={`/products/${product._id}`} className="space-y-2">
        <NextImage
          src={product.media[0]}
          alt="product"
          width={220}
          height={300}
          className="min-h-[220px] rounded-lg object-cover max-w-[220px] max-h-[300px]"
        />
        <div>
          <p className="text-base-bold">{product.title}</p>
          <p className="text-small-medium text-grey-3 capitalize">
            {product.category}
          </p>
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <Wishlist product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
