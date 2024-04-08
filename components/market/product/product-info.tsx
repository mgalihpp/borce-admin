"use client";

import useCart from "@/store/use-cart";
import React, { useState } from "react";
import Wishlist from "./wishlist";
import { cn } from "@/lib/utils";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Gallery from "./gallery";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const ProductInfo = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const [quantity, setQuantity] = useState(1);

  const { cartItems, addItem } = useCart();

  const isItemInCart = (itemId: string): boolean => {
    return cartItems.some((cartItem) => cartItem.item._id === itemId);
  };

  return (
    <>
      <Gallery media={product.media}>
        <div className="w-full flex-col items-center">
          <Accordion type="single" collapsible>
            <AccordionItem value="product-details">
              <AccordionTrigger className="hover:no-underline">Product Details</AccordionTrigger>
              <AccordionContent className="whitespace-pre-wrap">
                {product.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Gallery>

      <Card className="h-max w-full">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <h4 className="text-base-medium text-gray-900">Category:</h4>
              <p className="text-small-medium capitalize">{product.category}</p>
            </div>

            <div className="flex max-lg:flex-col max-lg:items-start max-lg:gap-2 max-md:flex-row max-md:items-start max-md:justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2 lg:items-center lg:justify-between">
              <h2 className="text-heading2-bold">${product.price}</h2>

              <div className="flex items-center gap-2">
                <h4 className="text-base-medium text-gray-900">Quantity:</h4>

                <div className="flex items-center gap-4">
                  <MinusCircle
                    className="cursor-pointer hover:text-red-1"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  />
                  <p className="text-body-bold">{quantity}</p>
                  <PlusCircle
                    className="cursor-pointer hover:text-green-1"
                    onClick={() => setQuantity(quantity + 1)}
                  />
                </div>
              </div>
            </div>

            {product.colors.length > 0 && (
              <div className="flex flex-col gap-4">
                <h4 className="text-base-medium text-gray-900">Colors:</h4>

                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <Badge
                      className={cn(
                        "cursor-pointer rounded-lg border border-black bg-white px-2 py-1 capitalize text-black hover:text-white",
                        {
                          "bg-black text-white": selectedColor === color,
                        },
                      )}
                      key={index}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="flex flex-col gap-4">
                <h4 className="text-base-medium text-gray-900">Sizes:</h4>

                <div className="flex gap-2">
                  {product.sizes.map((size, index) => (
                    <Badge
                      className={cn(
                        "cursor-pointer rounded-lg border border-black bg-white px-2 py-1 uppercase text-black hover:text-white",
                        {
                          "bg-black text-white": selectedSize === size,
                        },
                      )}
                      key={index}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-4">
          <Wishlist product={product} type="button" />
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              if (isItemInCart(product._id)) {
                return router.push("/cart");
              }

              addItem({
                item: product,
                quantity,
                color: selectedColor,
                size: selectedSize,
              });
            }}
          >
            {isItemInCart(product._id) ? (
              "Already in Cart"
            ) : (
              <>
                <ShoppingCart className="mr-2 size-4" />
                Add to Cart
              </>
            )}
          </Button>

          <p className="text-sm">
            Also available at competitive prices from{" "}
            <span className="text-blue-1 underline">authorized retailers</span>,
            with optional Premium delivery for expedited shipping.
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductInfo;
