import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Pencil } from "lucide-react";

interface EditItemProps {
  item: "products" | "collections" | "orders";
  id: string;
}

const Edit: React.FC<EditItemProps> = ({ item, id }) => {
  const itemType =
    item === "products"
      ? "products"
      : item === "collections"
      ? "collections"
      : "orders";

  return (
    <Link
      href={`/dashboard/${itemType}/${id}`}
      className={buttonVariants({
        className: "text-white",
      })}
    >
      <Pencil className="size-4" />
    </Link>
  );
};

export default Edit;
