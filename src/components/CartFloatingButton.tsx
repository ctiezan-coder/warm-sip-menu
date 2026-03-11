import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartFloatingButton = () => {
  const { totalItems, setIsOpen } = useCart();

  return (
    <motion.button
      onClick={() => setIsOpen(true)}
      className="fixed right-5 top-1/2 -translate-y-1/2 sm:right-7 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full shadow-xl transition-all hover:scale-110 active:scale-95"
      title="Mon Panier"
      whileTap={{ scale: 0.9 }}
    >
      <ShoppingBag size={24} />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-md"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CartFloatingButton;
