"use client";

import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface WistListProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
  type?: "icon" | "button";
}

const Wishlist: React.FC<WistListProps> = ({
  product,
  updateSignedInUser,
  type = "icon",
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get<UserType>("/api/users");
      const data = res.data;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setIsLiked(data.wishlist.includes(product._id));
    }
  }, [data, setIsLiked, product._id]);

  const { mutate: createLike } = useMutation({
    mutationKey: ["wishlist"],
    mutationFn: async (data: string) => {
      interface WishlistResponse extends UserType {
        responseType: "unliked" | "liked";
      }

      const { data: like } = await axiosInstance.post<WishlistResponse>(
        "/api/users/wishlist",
        data
      );

      return like;
    },
  });

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    createLike(product._id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["user-wishlist"],
        });
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        toast.success(
          data.responseType === "liked"
            ? "Added to wishlist"
            : "Remove from wishlist"
        );
        setIsLiked(data.wishlist.includes(product._id));
        updateSignedInUser && updateSignedInUser(data);
      },
    });
  };

  return type === "icon" ? (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "white"} `} />
    </button>
  ) : (
    <Button variant="outline" className="w-full" onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "white"} `} className="size-4 mr-2" />
      {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default Wishlist;
