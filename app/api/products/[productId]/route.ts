import connectToMongoDB from "@/lib/db";
import Collection from "@/lib/db/models/collection";
import Product from "@/lib/db/models/product";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauhorized", { status: 401 });
    }

    await connectToMongoDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    const data: ProductType = await req.json();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = data;

    if (!title || !description || !media || !price || !expense || !category) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const addedCollections = collections.filter((collection) => {
      // Check if any collection in product.collections has the same _id as collectionId
      return !product.collections.some((coll) =>
        coll._id.equals(collection._id)
      );
    });
    // included in new data, but not included in the previous data

    const removeCollections = product.collections.filter(
      (collection) =>
        !collections.some((coll) => coll._id === collection._id.toString())
    );
    // included in previous data, but not included in the new data

    // update collections

    await Promise.all([
      //update added collections with this current product
      ...addedCollections.map((collection) =>
        Collection.findByIdAndUpdate(collection, {
          $push: {
            products: {
              product,
            },
          },
        })
      ),
      // Update removed collections without this product
      ...removeCollections.map((collection) =>
        Collection.findByIdAndUpdate(collection, {
          $pull: {
            products: {
              product,
            },
          },
        })
      ),
    ]);

    // update product

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        expense,
      },
      {
        new: true,
      }
    ).populate({
      path: "collections",
      model: Collection,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Failed to update product" },
        { status: 400 }
      );
    }

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { productId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauhorized", { status: 401 });
    }

    await connectToMongoDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(product._id);

    // update collections
    await Promise.all(
      product.collections.map((collection) =>
        Collection.findOneAndUpdate(collection, {
          $pull: {
            products: {
              product,
            },
          },
        })
      )
    );

    return NextResponse.json(
      {
        message: "Product deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
