import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import DeliveryFormDialog from "@/components/DeliveryFormDialog";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, clearCart, totalItems, getWhatsAppUrl } = useCart();
  const [deliveryOpen, setDeliveryOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[71] w-full max-w-md flex flex-col"
              style={{
                background: "hsl(28 30% 16%)",
                borderLeft: "1px solid hsl(42 65% 65% / 0.15)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-primary/15">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={20} className="text-primary" />
                  <h2 className="font-display text-xl font-bold text-primary uppercase tracking-wider">
                    Mon Panier
                  </h2>
                  {totalItems > 0 && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-card/50 border border-primary/15 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-60">
                    <ShoppingBag size={48} className="text-primary/30" />
                    <p className="font-body text-muted-foreground text-sm">Votre panier est vide</p>
                    <p className="font-body text-muted-foreground/60 text-xs">
                      Ajoutez des plats depuis le menu
                    </p>
                  </div>
                ) : (
                  <>
                    {items.map((item) => (
                      <motion.div
                        key={item.name + item.price}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-primary/10"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-semibold text-foreground truncate">{item.name}</p>
                          <p className="font-body text-xs text-primary font-bold">{item.price}</p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.name, item.price, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary/60 border border-primary/10 text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-body text-sm font-bold text-foreground w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.name, item.price, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary/60 border border-primary/10 text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.name, item.price)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}

                    <button
                      onClick={clearCart}
                      className="w-full mt-2 py-2 text-center font-body text-xs text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wider"
                    >
                      Vider le panier
                    </button>
                  </>
                )}
              </div>

              {/* Footer - order button */}
              {items.length > 0 && (
                <div className="px-5 py-4 border-t border-primary/15 space-y-3">
                  <button
                    onClick={() => setDeliveryOpen(true)}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] text-white font-body font-bold text-sm uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25D366]/30"
                  >
                    <Truck size={22} />
                    Commander sur WhatsApp – Livraison
                  </button>
                  <p className="font-body text-[10px] text-muted-foreground text-center tracking-wide">
                    {totalItems} article{totalItems > 1 ? "s" : ""} dans le panier
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <DeliveryFormDialog open={deliveryOpen} onOpenChange={setDeliveryOpen} />
    </>
  );
};

export default CartDrawer;
