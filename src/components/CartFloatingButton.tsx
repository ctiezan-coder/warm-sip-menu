import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartFloatingButton = () => {
  const { totalItems, setIsOpen } = useCart();

  return (
    <motion.button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#1ebe57] text-destructive rounded-full shadow-xl transition-all hover:scale-110 active:scale-95"
      title="Mon Panier"
      whileTap={{ scale: 0.9 }}
    >
      <ShoppingBag size={26} />
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
