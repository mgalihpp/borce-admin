import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "../delete-item";
import Edit from "../edit-item";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => {
      const collectionsString = row.original.collections
        .map((collection) => collection.title)
        .join(", ");

      const truncatedCollections =
        collectionsString.length > 20
          ? collectionsString.slice(0, 20) + "..."
          : collectionsString;

      return truncatedCollections;
    },
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="space-x-2 flex items-center justify-center">
        <Edit item="products" id={row.original._id} />
        <Delete item="products" id={row.original._id} />
      </div>
    ),
  },
];
