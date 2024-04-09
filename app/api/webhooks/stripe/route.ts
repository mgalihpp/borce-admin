import Customer from "@/lib/db/models/customer";
import Order from "@/lib/db/models/order";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import connectToMongoDB from "@/lib/db";
import Stripe from "stripe";
import { headers } from "next/headers";

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return new NextResponse("Webhook error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const paymentId = session.id;
    const status = session.status;
    const shippingRateId = session.shipping_cost?.shipping_rate as string;
    const subTotal = session.amount_subtotal;
    const total = session.amount_total;

    const customerInfo = {
      customerId: session?.client_reference_id,
      name: session?.customer_details?.name,
      email: session?.customer_details?.email,
      phone: session.customer_details?.phone,
      payment: session.payment_method_types,
    };

    const shippingAddress = {
      street: session?.shipping_details?.address?.line1,
      street2: session.shipping_details?.address?.line2,
      city: session?.shipping_details?.address?.city,
      state: session?.shipping_details?.address?.state,
      postalCode: session?.shipping_details?.address?.postal_code,
      country: session?.shipping_details?.address?.country,
    };

    const retrieveSession = await stripe.checkout.sessions.retrieve(
      session.id,
      { expand: ["line_items.data.price.product"] },
    );

    const shippingRate = await stripe.shippingRates.retrieve(shippingRateId);

    const lineItems = await retrieveSession?.line_items?.data;

    const orderItems = lineItems?.map((item: any) => {
      return {
        product: item.price.product.metadata.productId,
        color: item.price.product.metadata.color || "N/A",
        size: item.price.product.metadata.size || "N/A",
        quantity: item.quantity,
      };
    });

    await connectToMongoDB();

    const newOrder = await Order.create({
      customerId: customerInfo.customerId,
      products: orderItems,
      shippingAddress,
      shippingRate,
      subTotal: subTotal ? subTotal / 100 : 0,
      totalAmount: total ? total / 100 : 0,
      paymentMethod: customerInfo.payment ?? ["card"],
      status: status ?? "completed",
    });

    await newOrder.save();

    let customer = await Customer.findOne({
      customerId: customerInfo.customerId,
    });

    if (customer) {
      customer.orders.push(newOrder._id);
    } else {
      customer = await Customer.create({
        ...customerInfo,
        orders: [newOrder._id],
      });
    }

    await customer.save();
  }

  return NextResponse.json("Order created", { status: 200 });
};
