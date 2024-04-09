import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer }: { cartItems: CartItem[]; customer: any } =
      await req.json();

    if (!cartItems || !customer) {
      return NextResponse.json("Not enough data to checkout", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["ID"],
      },
      shipping_options: [
        {
          shipping_rate: "shr_1P3SDOCGnwIXEOdzjZaGHNGA",
        },
      ],
      line_items: cartItems.map((cart) => ({
        price_data: {
          currency: "USD",
          product_data: {
            name: cart.item.title,
            images: cart.item.media,
            description: cart.item.description,
            metadata: {
              productId: cart.item._id,
              ...(cart.size && { size: cart.size }),
              ...(cart.color && { color: cart.color }),
            },
          },
          unit_amount: Math.round(cart.item.price * 100),
        },
        quantity: cart.quantity,
      })),
      client_reference_id: customer.customerId,
      success_url: `${process.env.ADMIN_DASHBOARD_URL}/payment?success=1&uid=${customer.customerId}`,
      cancel_url: `${process.env.ADMIN_DASHBOARD_URL}/cart`,
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
