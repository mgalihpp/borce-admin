import ProductCard from "@/components/market/product/product-card";
import ProductInfo from "@/components/market/product/product-info";
import {
  getProductDetails,
  getRelatedProducts,
} from "@/server/actions/product";

export default async function SingleProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { product } = await getProductDetails(params.productId);
  const { relatedProducts } = await getRelatedProducts(params.productId);

  return (
    <div className="max-w-7xl w-full">
      <div className="w-full flex justify-start gap-16 py-10 px-10 max-md:flex-col max-md:items-center max-sm:px-2">
        <ProductInfo product={product} />
      </div>

      <div className="w-full flex flex-col max-sm:items-center items-start px-10 py-10 max-md:px-3 space-y-16">
        <p className="text-heading4-medium">Customers also purchased</p>
        {!relatedProducts || relatedProducts.length === 0 ? (
          <p className="text-small-normal">No related products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {relatedProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
