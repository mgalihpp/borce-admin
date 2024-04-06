import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wishlist from "./wishlist";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  updateSignedInUser,
}) => {
  return (
    <div
      // href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2 hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover max-w-[250px] max-h-[300px]"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-3 capitalize">
          {product.category}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">${product.price}</p>
        <Wishlist product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
