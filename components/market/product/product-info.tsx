"use client";

import useCart from "@/store/use-cart";
import React, { useState } from "react";
import Wishlist from "./wishlist";
import { cn } from "@/lib/utils";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductInfo = ({ product }: { product: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{product.title}</p>
        <Wishlist product={product} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-3">Category:</p>
        <p className="text-base-bold">{product.category}</p>
      </div>

      <p className="text-heading3-bold">${product.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-3">Description:</p>
        <p className="text-base-bold">{product.description}</p>
      </div>

      {product.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-3">Colors:</p>
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <p
                className={cn(
                  "border border-black px-2 py-1 rounded-lg cursor-pointer capitalize",
                  {
                    "bg-black text-white": selectedColor === color,
                  }
                )}
                key={index}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-3">Colors:</p>
          <div className="flex gap-2">
            {product.sizes.map((size, index) => (
              <p
                className={cn(
                  "border border-black px-4 py-1 rounded-lg cursor-pointer uppercase",
                  {
                    "bg-black text-white": selectedSize === size,
                  }
                )}
                key={index}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-3">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity((prev) => prev + 1)}
          />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() =>
          addItem({
            item: product,
            quantity,
            color: selectedColor,
            size: selectedSize,
          })
        }
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductInfo;
