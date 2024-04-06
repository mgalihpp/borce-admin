import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clear: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const isExisting = currentItems.find(
          (cart) => cart.item._id === item._id
        );

        if (isExisting) {
          toast.warning("Item already in the cart");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart", { icon: "🛒" });
      },
      removeItem: (id: string) => {
        const newCartItems = get().cartItems.filter(
          (cart) => cart.item._id !== id
        );

        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (id: string) => {
        const newCartItems = get().cartItems.map((cart) =>
          cart.item._id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
        );

        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },
      decreaseQuantity: (id: string) => {
        const newCartItems = get().cartItems.map((cart) =>
          cart.item._id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
        );

        set({ cartItems: newCartItems });
        toast.success("Item quantity decreased");
      },
      clear: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
