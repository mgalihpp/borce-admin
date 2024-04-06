import connectToMongoDB from "@/lib/db";
import User from "@/lib/db/models/user";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToMongoDB();

    let user = await User.findOne({
      customerId: userId,
    }).select('customerId wishlist');

    if (!user) {
      user = await User.create({ customerId: userId });
      await user.save();
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
