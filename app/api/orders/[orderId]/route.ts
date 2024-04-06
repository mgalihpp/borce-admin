import connectToMongoDB from "@/lib/db";
import Customer from "@/lib/db/models/customer";
import Order from "@/lib/db/models/order";
import Product from "@/lib/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      orderId: string;
    };
  }
) {
  try {
    await connectToMongoDB();

    const orderDetails = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product,
    });

    if (!orderDetails)
      return NextResponse.json("Order not found", { status: 404 });

    const customer = await Customer.findOne({
      customerId: orderDetails.customerId,
    });

    return NextResponse.json({ orderDetails, customer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
