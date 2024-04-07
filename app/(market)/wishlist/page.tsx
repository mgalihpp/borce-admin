"use client";

import Loader from "@/components/loader";
import ProductCard from "@/components/market/product/product-card";
import axiosInstance from "@/lib/axios";
import { getProductDetails } from "@/server/actions/product";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const { user } = useUser();

  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get<UserType>("/api/users");
      const data = res.data;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const wishlistProducts = await Promise.all(
          (userData?.wishlist || []).map(async (productId) => {
            const { product } = await getProductDetails(productId);
            return product;
          })
        );

        setWishlist(wishlistProducts);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
        // Handle the error as needed
      }
    };

    fetchWishlistProducts();
  }, [userData]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5 text-center">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && <p>No items in your wishlist</p>}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
