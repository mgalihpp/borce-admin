import NextImage from "@/components/next-image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { getOrders } from "@/server/actions/order";
import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Check, EllipsisIcon } from "lucide-react";
import Link from "next/link";

export default async function OrderPage() {
  const { userId } = auth();

  const { orders } = await getOrders(userId as string);

  return (
    <div className="flex w-full gap-20 px-10 py-16 max-lg:flex-col max-sm:px-2">
      <div className="flex flex-col lg:w-3/5">
        <h1 className="text-heading2-bold">Order History</h1>
        <p className="mt-2 text-sm text-gray-500">
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>
        <Separator className="mb-6 mt-12" />

        <div className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-8">
          <div className="space-y-8">
            <h3 className="text-base-bold">Shipping & Billing Info</h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Name</h6>
                <p className="text-small-medium">{orders[1].name}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Email Address</h6>
                <p className="text-small-medium">{orders[1].email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Phone Number</h6>
                <p className="text-small-medium">{orders[1].email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Shipping Address</h6>
                <p className="text-small-medium">
                  {orders[0].shippingAddress.street},{" "}
                  {orders[0].shippingAddress.city},{" "}
                  {orders[0].shippingAddress.state},{" "}
                  {orders[0].shippingAddress.postalCode},{" "}
                  {orders[0].shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-base-bold">Payment Method</h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Payment</h6>
                <p className="text-small-medium">Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:mt-20 lg:w-2/5">
        <div>
          <Card>
            <CardHeader>
              <div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-2">
                      <h6 className="text-small-medium max-sm:text-xs">
                        Order number
                      </h6>
                      <p className="max-w-[100px] truncate text-xs text-grey-3">
                        {orders[0]._id}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h6 className="text-small-medium max-sm:text-xs">
                        Date created
                      </h6>
                      <p className="text-xs text-grey-3">
                        {format(orders[0].createdAt, "MMMM do, yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h6 className="text-small-medium max-sm:text-xs">
                        Total amount
                      </h6>
                      <p className="text-xs font-semibold text-gray-900">
                        ${orders[0].totalAmount}
                      </p>
                    </div>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisIcon className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Order</DropdownMenuItem>
                        <DropdownMenuItem>View Invoice</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="mt-2">
              <div className="flex w-full flex-col">
                {orders[0].products.map(
                  ({ product }: { product: ProductType }) => (
                    <div key={product._id} className="flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <NextImage
                          src={product.media[0]}
                          alt={product.title}
                          width={80}
                          height={80}
                          quality={100}
                        />

                        <div className="flex w-full flex-col items-start space-y-2 text-xs max-sm:items-center">
                          <div className="flex w-full justify-between text-xs font-semibold max-sm:flex-col">
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                          </div>
                          <div className="max-sm:hidden">
                            <p className="max-w-[250px] truncate">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between max-xl:flex-col max-xl:items-start max-xl:gap-2 max-sm:flex-col max-sm:items-start max-sm:gap-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Check className="size-3 rounded-full bg-green-1 text-white" />
                          <p>Delivered on 12, July, 2024</p>
                        </div>
                        <Separator className="w-full max-xl:block max-sm:block xl:hidden" />
                        <div className="flex items-center gap-3 text-xs font-medium text-blue-1 max-xl:w-full max-xl:justify-between max-sm:w-full max-sm:justify-between">
                          <Link href={`/products/${product._id}`}>
                            View Product
                          </Link>
                          <div className="h-3 border-l border-gray-300"></div>

                          <Link href={`/products/${product._id}`}>
                            Buy Again
                          </Link>
                        </div>
                      </div>

                      <Separator className="mb-2" />
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    // <div className="px-10 py-5 max-sm:px-3">
    //   <p className="my-10 text-heading3-bold">Your Orders</p>
    //   {!orders ||
    //     (orders.length === 0 && (
    //       <p className="my-5 text-body-bold">You have no orders yet.</p>
    //     ))}

    //   <div className="flex flex-col gap-10">
    //     {orders?.map((order: OrderType) => (
    //       <div
    //         className="flex flex-col gap-8 p-4 hover:bg-grey-1"
    //         key={order._id}
    //       >
    //         <div className="flex gap-20 max-md:flex-col max-md:gap-3">
    //           <p className="text-base-bold">Order ID: {order._id}</p>
    //           <p className="text-base-bold">
    //             Total Amount: ${order.totalAmount}
    //           </p>
    //         </div>

    //         <div className="flex flex-col gap-5">
    //           {order.products.map((orderItem: OrderItemType) => (
    //             <div className="flex gap-4" key={orderItem.product._id}>
    //               <Image
    //                 src={orderItem.product.media[0]}
    //                 alt={orderItem.product.title}
    //                 width={100}
    //                 height={100}
    //                 className="h-32 w-32 rounded-lg object-cover"
    //               />
    //               <div className="flex flex-col justify-between">
    //                 <p className="text-small-medium">
    //                   Title:{" "}
    //                   <span className="text-small-bold">
    //                     {orderItem.product.title}
    //                   </span>
    //                 </p>
    //                 {orderItem.color && (
    //                   <p className="text-small-medium">
    //                     Color:{" "}
    //                     <span className="text-small-bold">
    //                       {orderItem.color}
    //                     </span>
    //                   </p>
    //                 )}
    //                 {orderItem.size && (
    //                   <p className="text-small-medium">
    //                     Size:{" "}
    //                     <span className="text-small-bold">
    //                       {orderItem.size}
    //                     </span>
    //                   </p>
    //                 )}
    //                 <p className="text-small-medium">
    //                   Unit price:{" "}
    //                   <span className="text-small-bold">
    //                     {orderItem.product.price}
    //                   </span>
    //                 </p>
    //                 <p className="text-small-medium">
    //                   Quantity:{" "}
    //                   <span className="text-small-bold">
    //                     {orderItem.quantity}
    //                   </span>
    //                 </p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
