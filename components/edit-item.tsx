import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Pencil } from "lucide-react";

interface EditItemProps {
  item: "products" | "collections";
  id: string;
}

const Edit: React.FC<EditItemProps> = ({ item, id }) => {
  const itemType = item === "products" ? "products" : "collections";

  return (
    <Link
      href={`/${itemType}/${id}`}
      className={buttonVariants({
        className: "bg-green-1 text-white",
      })}
    >
      <Pencil className="size-4" />
    </Link>
  );
};

export default Edit;
