import ProductCard from "@/components/market/product/product-card";
import ProductInfo from "@/components/market/product/product-info";
import {
  getProductDetails,
  getRelatedProducts,
} from "@/server/actions/product";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function SingleProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { product } = await getProductDetails(params.productId);
  const { relatedProducts } = await getRelatedProducts(params.productId);

  return (
    <div className="w-full max-w-7xl">
      <div className="flex w-full justify-start gap-16 px-10 py-10 max-md:flex-col max-md:items-center max-sm:px-2">
        <ProductInfo product={product} />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-16 px-10 py-10 max-md:px-3 max-sm:items-center">
        <div className="flex w-full items-center justify-between">
          <p className="text-heading4-medium max-sm:text-base-medium">
            Customers also purchased
          </p>

          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium text-blue-1 underline-offset-2 hover:underline max-sm:text-xs"
          >
            View all <ChevronRight className="ml-1 size-4" />
          </Link>
        </div>
        {!relatedProducts || relatedProducts.length === 0 ? (
          <p className="text-small-normal">No related products found.</p>
        ) : (
          <div className="grid w-full items-center justify-center gap-16 max-sm:flex max-sm:flex-wrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {relatedProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
