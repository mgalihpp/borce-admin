import connectToMongoDB from "@/lib/db";
import Customer from "@/lib/db/models/customer";
import Order from "@/lib/db/models/order";
import Product from "@/lib/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { customerId: string } },
) {
  try {
    await connectToMongoDB();

    let orders = await Order.find({
      customerId: params.customerId,
    }).populate({
      path: "products.product",
      model: Product,
    });

    const customer = await Customer.findOne({
      customerId: params.customerId,
    });

    if (!orders) return NextResponse.json("Order not found", { status: 404 });

    return NextResponse.json({ orders, customer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
