"use client";

import NextImage from "@/components/next-image";
import { Separator } from "@/components/ui/separator";
import useCart from "@/store/use-cart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, X } from "lucide-react";
import NoFound from "./_components/no-found";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { user } = useUser();
  const { cartItems, removeItem, editItem } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0,
  );

  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    customerId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const { mutate: createCheckout, isPending } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/api/checkout", {
        cartItems,
        customer,
      });

      return data;
    },
  });

  const handleCheckout = () => {
    createCheckout(undefined, {
      onSuccess: (data) => {
        router.push(data.url);
      },
    });
  };

  return !cartItems ? (
    <Loader />
  ) : cartItems.length === 0 ? (
    <div className="px-10 py-16 max-sm:px-3">
      <NoFound />
    </div>
  ) : (
    <div className="flex w-full gap-20 px-10 py-16 max-lg:flex-col max-sm:px-2">
      <div className="flex flex-col lg:w-3/5">
        <h1 className="text-heading2-bold">Shopping Cart</h1>
        <Separator className="mb-6 mt-12" />

        {cartItems.map((cart) => (
          <div key={cart.item._id}>
            <div className="flex w-full justify-between gap-3 px-4 py-3 max-sm:items-start">
              <div className="flex gap-4 max-sm:flex-col">
                <NextImage
                  src={cart.item.media[0]}
                  alt={cart.item.title}
                  width={150}
                  height={150}
                  className="max-h-[150px] max-w-[150px] rounded-lg object-cover"
                />

                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <h4 className="text-small-bold">Name:</h4>
                    <p className="text-small-medium">{cart.item.title}</p>
                  </div>
                  {cart.color && (
                    <div className="flex items-center gap-2">
                      <h4 className="text-small-bold">Color:</h4>
                      {cart.item.colors.map((color, index) => (
                        <Badge
                          className={cn(
                            "cursor-pointer rounded-lg border border-black bg-white px-2 py-1 capitalize text-black hover:text-white",
                            {
                              "bg-black text-white": cart.color === color,
                            },
                          )}
                          key={index}
                          onClick={() =>
                            editItem({
                              item: cart.item,
                              color,
                              quantity: cart.quantity,
                            })
                          }
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {cart.size && (
                    <div className="flex items-center gap-2">
                      <h4 className="text-small-bold">Size:</h4>
                      {cart.item.sizes.map((size, index) => (
                        <Badge
                          className={cn(
                            "cursor-pointer rounded-lg border border-black bg-white px-2 py-1 uppercase text-black hover:text-white",
                            {
                              "bg-black text-white": cart.size === size,
                            },
                          )}
                          key={index}
                          onClick={() =>
                            editItem({
                              item: cart.item,
                              size,
                              quantity: cart.quantity,
                            })
                          }
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <h4 className="text-small-bold">Quantity:</h4>

                    <div className="flex items-center gap-4">
                      <MinusCircle
                        className="size-4 cursor-pointer hover:text-red-1"
                        onClick={() =>
                          cart.quantity > 1 &&
                          editItem({
                            item: cart.item,
                            quantity: cart.quantity - 1,
                          })
                        }
                      />
                      <p className="text-small-bold">{cart.quantity}</p>
                      <PlusCircle
                        className="size-4 cursor-pointer hover:text-green-1"
                        onClick={() =>
                          editItem({
                            item: cart.item,
                            quantity: cart.quantity + 1,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  variant="transparent"
                  size="sm"
                  onClick={() => removeItem(cart.item._id)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-6" />
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:mt-16 lg:w-2/5">
        <div className="flex flex-col space-y-6">
          <h2 className="text-heading4-medium">Order Summary</h2>

          <div className="flex items-center justify-between">
            <p className="text-small-normal">Subtotal</p>
            <p className="text-small-medium">${totalRounded}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-small-normal">Tax</p>
            <p className="text-small-medium">${totalRounded}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-small-normal">Total</p>
            <p className="text-small-medium">${totalRounded}</p>
          </div>

          <Button type="button" onClick={handleCheckout} disabled={isPending}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
