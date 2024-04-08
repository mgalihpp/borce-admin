import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/dashboard",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/dashboard/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/dashboard/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/dashboard/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/dashboard/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
];

export const SORT_OPTIONS = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Price: Low to High",
    value: "price-asc",
  },
  {
    name: "Price: High to Low",
    value: "price-desc",
  },
] as const;

export const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  option: [
    {
      value: [0, 1000],
      label: "Any price",
    },
    {
      value: [0, 50],
      label: "Under 50$",
    },
    {
      value: [0, 100],
      label: "Under 100$",
    },
    // custom option defined in jsx
  ],
} as const;
