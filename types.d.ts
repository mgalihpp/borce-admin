type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};

type CustomerType = {
  customerId?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  createdAt: string;
  updatedAt: string;
};

type SortType = "none" | "newest" | "price-asc" | "price-desc";

type FilterProps = {
  sort: SortType;
  category: string;
  colors: string[];
  sizes: string[];
  price: { isCustom: boolean; range: [number, number] };
  page: number;
  pageSize: number;
};

type OrderType = {
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType];
  shippingRate: string;
  totalAmount: number;
};

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}
