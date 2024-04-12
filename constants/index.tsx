import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  Ticket,
  UsersRound,
} from "lucide-react";

type NavigationLinks = {
  url: string;
  icon: JSX.Element;
  label: string;
};

export const navLinks: NavigationLinks[] = [
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
    url: "/dashboard/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
  {
    url: "/dashboard/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: '/dashboard/coupons',
    icon: <Ticket />,
    label: 'Coupons'
  }
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
