import connectToMongoDB from "@/lib/db";
import Collection from "@/lib/db/models/collection";
import Product from "@/lib/db/models/product";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToMongoDB();

    const products = await Product.find()
      .sort({
        createdAt: "desc",
      })
      .populate({
        path: "collections",
        model: Collection,
      });

    return NextResponse.json(products, { status: 200 });
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

    const data: ProductType = await req.json();

    const {
      title,
      description,
      media,
      category,
      tags,
      collections,
      sizes,
      colors,
      expense,
      price,
    } = data;

    if (!title || !description || !media || !price || !expense || !category) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      tags,
      collections,
      sizes,
      colors,
      expense,
      price,
    });

    await newProduct.save();

    if (collections) {
      for (const collectionId of collections) {
        await Collection.findByIdAndUpdate(
          collectionId,
          {
            $push: { products: newProduct._id },
          },
          { new: true }
        );
      }
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
