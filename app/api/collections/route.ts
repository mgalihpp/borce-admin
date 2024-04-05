import connectToMongoDB from "@/lib/db";
import Collection from "@/lib/db/models/collection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongoDB();

    const collections = await Collection.find();

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
