import ProductCard from "@/components/market/product/product-card";
import { getProducts } from "@/server/actions/product";
import React from "react";

const ProductList = async () => {
  const { products } = await getProducts();

  return (
    <div className="flex flex-col items-center gap-10 px-5 py-8">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-small-normal">No products found</p>
      ) : (
        <ProductCard products={products} />
      )}
    </div>
  );
};

export default ProductList;
