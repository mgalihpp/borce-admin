import ProductCard from "@/components/market/product/product-card";
import { getProducts } from "@/server/actions/product";
import React from "react";

const ProductList = async () => {
  const { products } = await getProducts();

  return (
    <div className="flex  flex-col items-center gap-10 px-5 py-8">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-small-normal">No products found</p>
      ) : (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-16">
        // products.map((product) => (
        <ProductCard product={products} />
        // ))
      )}
    </div>
  );
};

export default ProductList;
