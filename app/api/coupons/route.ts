import connectToMongoDB from "@/lib/db";
import Coupon from "@/lib/db/models/coupon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();

    const coupons = await Coupon.find();

    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: CouponType = await req.json();

    const { code, description, isLimit, limit } = data;

    await connectToMongoDB()

    const newCoupon = await Coupon.create({
      code,
      description,
      isLimit,
      limit,
    });

    await newCoupon.save();

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
