import connectToMongoDB from "@/lib/db";
import Product from "@/lib/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: FilterProps = await req.json();

    const { sort, category, colors, sizes, price, page, pageSize } = data;

    await connectToMongoDB();

    let query: any = {};

    // Filter by category

    if (category) {
      query["category"] = { $in: category };
    }

    // Filter by colors
    if (colors.length > 0) {
      query["colors"] = { $in: colors };
    }

    // Filter by sizes
    if (sizes.length > 0) {
      query["sizes"] = { $in: sizes };
    }

    // Filter by price range
    if (price) {
      query["price"] = { $gte: price.range[0], $lte: price.range[1] };
    }

    let sorts = {};

    switch (sort) {
      case "newest":
        sorts = { createdAt: -1 };
        break;
      case "price-asc":
        sorts = { price: 1 };
        break;
      case "price-desc":
        sorts = { price: -1 };
        break;
      default:
        // Handle the case when sort is "none" or other unrecognized values
        break;
    }

    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Execute the query based on filter options
    let products = await Product.find(query)
      .sort(sorts)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
