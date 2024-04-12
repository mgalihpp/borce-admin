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
  customerId: string;
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
  query: string;
  price: { isCustom: boolean; range: [number, number] };
  page: number;
  pageSize: number;
};

type OrderType = {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  _id: string;
  customerClerkId: string;
  products: [OrderItemType];
  shippingRate: {
    id: string;
    object: string;
    active: boolean;
    created: number;
    delivery_estimate: {
      maximum: {
        unit: string;
        value: number;
      };
      minimum: {
        unit: string;
        value: number;
      };
    };
    fixed_amount: {
      amount: number;
      currency: string;
    };
    display_name: string;
    livemode: boolean;
    tax_behavior: string;
  };
  totalAmount: number;
  paymentMethod: string[];
  createdAt: Date;
};

type CouponType = {
  _id: string;
  code: string;
  description: string;
  listUser: [UserType];
  isLimit: boolean | string;
  limit?: number | undefined;
};

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}
