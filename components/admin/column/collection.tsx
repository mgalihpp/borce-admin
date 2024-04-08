import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "../delete-item";
import Edit from "../edit-item";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="space-x-2 flex items-center justify-start">
        <Edit item="collections" id={row.original._id} />
        <Delete item="collections" id={row.original._id} />
      </div>
    ),
  },
];
