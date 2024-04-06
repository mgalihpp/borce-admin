import connectToMongoDB from "@/lib/db";
import User from "@/lib/db/models/user";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToMongoDB();

    const user = await User.findOne({ customerId: userId });

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const productId = await req.json();

    if (!productId) {
      return NextResponse.json("Product ID is missing", { status: 400 });
    }

    const isLiked = user.wishlist.includes(productId);

    if (isLiked) {
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
