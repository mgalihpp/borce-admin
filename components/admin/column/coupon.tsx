import { ColumnDef } from "@tanstack/react-table";
import Stripe from "stripe";

export const columns: ColumnDef<Stripe.PromotionCode>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => {
      const limit = row.original.max_redemptions;

      let textContent = ``;

      // if limit equals 0, this mean infinity use
      if (limit === 0 || limit === null) {
        textContent = "Unlimited";
      } else {
        textContent = `${limit}`;
      }

      return textContent;
    },
  },
  {
    accessorKey: "expires_at",
    header: "Expires at",
  },
  {
    accessorKey: "times_redeemed",
    header: "Redeemed",
  },
];
