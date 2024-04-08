import connectToMongoDB from "@/lib/db";
import Customer from "@/lib/db/models/customer";
import Order from "@/lib/db/models/order";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();

    const orders = await Order.find({}).sort({ createdAt: "desc" });

    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findOne({
          customerId: order.customerId,
        });
        return {
          _id: order._id,
          customer: customer?.name,
          products: order.products.length,
          totalAmount: order.totalAmount,
          createdAt: format(order.createdAt, "MMM do, yyyy"),
        };
      })
    );

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
