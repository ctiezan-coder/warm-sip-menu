import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CartItem {
  name: string;
  price: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (name: string, price: string) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  getWhatsAppUrl: () => string;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((name: string, price: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) => (i.name === name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { name, price, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const updateQuantity = useCallback((name: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.name !== name));
    } else {
      setItems((prev) => prev.map((i) => (i.name === name ? { ...i, quantity } : i)));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const getWhatsAppUrl = useCallback(() => {
    const lines = items.map((i) => `• ${i.name} x${i.quantity} — ${i.price}`).join("\n");
    const message = `Bonjour Neriya ! 🍽️ Je souhaite commander :\n\n${lines}\n\nMerci de me confirmer ma commande ! 😊`;
    return `https://wa.me/2250789288202?text=${encodeURIComponent(message)}`;
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, isOpen, setIsOpen, getWhatsAppUrl }}
    >
      {children}
    </CartContext.Provider>
  );
};
