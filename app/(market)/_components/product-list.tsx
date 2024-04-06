import ProductCard from "@/components/market/product/product-card";
import { getProducts } from "@/server/actions/product";
import React from "react";

const ProductList = async () => {
  const { products } = await getProducts();

  return (
    <div className="flex  flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
