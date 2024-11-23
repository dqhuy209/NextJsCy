import { toast } from "react-toastify";

const { create } = require("zustand");
const { persist } = require("zustand/middleware");

const useCartStore = create(
  persist((set, get) => ({
    items: [],
    addItem: (product, quantity = 1) => {
      set((state) => {
        const existingItem = state.items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          if (existingItem.product.stock === existingItem.quantity) {
            toast.info("Out of stock!");
            return state;
          }

          toast.success("Add to cart successfully");
          return {
            ...state,
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
        toast.success("Add to cart successfully");

        return {
          ...state,
          items: [...state.items, { product, quantity }],
        };
      });
    },
    removeItem: (itemId) => {
      set((state) => ({
        items: state.items.filter((item) => item.product.id !== itemId),
      }));
    },
    updateItemQuantity: (itemId, quantity) => {
      set((state) => ({
        ...state,
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      }));
    },
    clearCart: () => {
      set(() => ({
        items: [],
      }));
    },
  }))
);
export default useCartStore;
