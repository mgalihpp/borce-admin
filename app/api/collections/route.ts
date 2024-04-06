import connectToMongoDB from "@/lib/db";
import Collection from "@/lib/db/models/collection";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await connectToMongoDB();

    const data: CollectionType = await req.json();

    const { title, description, image } = data;

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return NextResponse.json("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
      return NextResponse.json("Title and image are required", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();

    return NextResponse.json(newCollection, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
