import connectToMongoDB from "@/lib/db";
import Collection from "@/lib/db/models/collection";
import Product from "@/lib/db/models/product";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  try {
    await connectToMongoDB();

    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, {
      status: 200,
      headers: {
        // "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauhorized", { status: 401 });
    }

    await connectToMongoDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    const data: CollectionType = await req.json();

    const { title, description, image } = data;

    if (!title || !image) {
      return NextResponse.json("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      collection._id,
      {
        title,
        description,
        image,
      },
      {
        new: true,
      }
    );

    await collection?.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauhorized", { status: 401 });
    }

    await connectToMongoDB();

    await Collection.findByIdAndDelete(params.collectionId);

    await Product.updateMany(
      {
        collections: params.collectionId,
      },
      {
        $pull: {
          collections: params.collectionId,
        },
      }
    );

    return NextResponse.json("Collection deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
