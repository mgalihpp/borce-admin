"use client";

import NextImage from "@/components/next-image";
import { Separator } from "@/components/ui/separator";
import useCart from "@/store/use-cart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import NoFound from "./_components/no-found";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const { user } = useUser();
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } =
    useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );

  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    customerId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  return cartItems.length === 0 ? (
    <div className="py-16 px-10 max-sm:px-3">
      <NoFound />
    </div>
  ) : (
    <div className="w-full flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="flex flex-col lg:w-3/5">
        <h1 className="text-heading2-bold">Shopping Cart</h1>
        <Separator className="mt-12 mb-6" />

        {cartItems.map((cart) => (
          <>
            <div
              className="w-full flex gap-3 px-4 py-3 max-sm:items-start justify-between"
              key={cart.item._id}
            >
              <div className="flex gap-4">
                <NextImage
                  src={cart.item.media[0]}
                  alt={cart.item.title}
                  width={150}
                  height={150}
                  className="object-cover max-w-[150px] max-h-[150px] rounded-lg"
                />

                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <h4 className="text-small-bold">Name:</h4>
                    <p className="text-small-medium">{cart.item.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <h4 className="text-small-bold">Color:</h4>
                    <p className="text-small-medium">{cart.color}</p>
                  </div>
                  <div className="flex gap-2">
                    <h4 className="text-small-bold">Size:</h4>
                    <p className="text-small-medium capitalize">{cart.size}</p>
                  </div>
                  <div className="flex gap-2">
                    <h4 className="text-small-bold">Quantity:</h4>
                    <p className="text-small-medium capitalize">
                      {cart.quantity}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  variant="destructive"
                  onClick={() => removeItem(cart.item._id)}
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-6" />
          </>
        ))}
      </div>
      <div className="flex flex-col lg:w-2/5 lg:mt-16">
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

          <Button>Checkout</Button>
        </div>
      </div>
    </div>

    // <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
    //   <div className="max-lg:w-full">
    //     <p className="text-heading3-bold">Shopping Cart</p>
    //     <Separator className="my-6" />

    //     {cartItems.length === 0 ? (
    //       <p className="text-body-bold">No item in the cart</p>
    //     ) : (
    //       <div>
    //         {cartItems.map((item) => (
    //           <div
    //             className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-4 px-4 py-3 items-center max-sm:items-start justify-between"
    //             key={item.item._id}
    //           >
    //             <div className="flex items-center">
    //               <NextImage
    //                 src={item.item.media[0]}
    //                 alt="product image"
    //                 width={100}
    //                 height={100}
    //                 className="rounded-lg w-32 h-32 object-cover"
    //               />

    //               <div className="flex flex-col gap-3 ml-4">
    //                 <p className="text-body-bold">{item.item.title}</p>
    //                 {item.color && (
    //                   <p className="text-small-medium">{item.color}</p>
    //                 )}
    //                 {item.size && (
    //                   <p className="text-small-medium">{item.size}</p>
    //                 )}
    //                 <p className="text-small-medium">{item.item.price}</p>
    //               </div>
    //             </div>

    //             <div className="flex gap-4 items-center">
    //               <MinusCircle
    //                 className="hover:text-red-1 cursor-pointer"
    //                 onClick={() => decreaseQuantity(item.item._id)}
    //               />
    //               <p className="text-body-bold">{item.quantity}</p>
    //               <PlusCircle
    //                 className="hover:text-red-1 cursor-pointer"
    //                 onClick={() => increaseQuantity(item.item._id)}
    //               />
    //             </div>

    //             <Trash
    //               className="hover:text-red-1 cursor-pointer"
    //               onClick={() => removeItem(item.item._id)}
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}
