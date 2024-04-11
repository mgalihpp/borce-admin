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
import { EllipsisIcon, X } from "lucide-react";
import Link from "next/link";

export default async function OrderPage() {
  const { userId } = auth();

  const { orders, customer } = await getOrders(userId as string);

  return orders.length === 0 ? (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <NextImage
            src="/order-empty.png"
            alt="no order"
            width={350}
            height={400}
            quality={100}
          />
          <p className="text-base-medium">No order history found.</p>
          <Link
            href="/"
            className="my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-small-normal underline underline-offset-2 focus:outline-none dark:focus:ring-primary"
          >
            Back to Shopping
          </Link>
        </div>
      </div>
    </section>
  ) : (
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
                <p className="text-small-medium">{customer.name}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Email Address</h6>
                <p className="text-small-medium">{customer.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Phone Number</h6>
                <p className="text-small-medium">{customer.email}</p>
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
                <p className="text-small-medium capitalize">
                  {orders[0].paymentMethod ?? ""}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Shipping Rate</h6>
                <p className="text-small-medium">
                  {orders[0].shippingRate?.display_name}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Delivery Estimate</h6>
                <p className="text-small-medium">
                  {orders[0].shippingRate.delivery_estimate.minimum.value}-
                  {orders[0].shippingRate.delivery_estimate.maximum.value} Days
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <h6 className="text-sm text-grey-3">Cost</h6>
                <p className="text-small-medium">
                  {(
                    orders[0].shippingRate.fixed_amount.amount / 100
                  ).toLocaleString(undefined, {
                    style: "currency",
                    currency: orders[0].shippingRate.fixed_amount.currency,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:mt-20 lg:w-2/5">
        <div>
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-2">
                        <h6 className="text-small-medium max-sm:text-xs">
                          Order number
                        </h6>
                        <p className="max-w-[100px] truncate text-xs text-grey-3">
                          {order._id}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h6 className="text-small-medium max-sm:text-xs">
                          Date created
                        </h6>
                        <p className="text-xs text-grey-3">
                          {format(order.createdAt, "MMMM do, yyyy")}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h6 className="text-small-medium max-sm:text-xs">
                          Total amount
                        </h6>
                        <p className="text-xs font-semibold text-gray-900">
                          ${order.totalAmount}
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
                  {order.products.map(
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
                            {/* <CircleEllipsis className="size-3 rounded-full bg-orange-500 text-white" /> */}
                            {/* <Check className="size-3 rounded-full bg-green-1 text-white" /> */}
                            <X className="size-3 rounded-full bg-red-1 text-white" />
                            <p>Delivered canceled</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}
