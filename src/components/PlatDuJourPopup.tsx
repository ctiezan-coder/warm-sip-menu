import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Flame } from "lucide-react";

interface PlatDuJourPopupProps {
  name: string;
  price: string;
  description?: string;
  image: string;
}

const getWhatsAppUrl = (itemName: string, price: string) => {
  const message = `Bonjour Neriya ! 🍽️ Je souhaite commander :\n\n⭐ *${itemName}* (Plat du jour) — ${price}\n\nMerci de me confirmer ma commande ! 😊`;
  return `https://wa.me/2250789288202?text=${encodeURIComponent(message)}`;
};

const PlatDuJourPopup = ({ name, price, description, image }: PlatDuJourPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-sm pointer-events-auto rounded-2xl overflow-hidden border border-primary/25 shadow-2xl"
              style={{ background: "linear-gradient(145deg, hsl(25 30% 14% / 0.98), hsl(28 25% 18% / 0.97))" }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-primary/15 text-foreground/70 hover:text-foreground hover:bg-black/60 transition-all"
              >
                <X size={16} />
              </button>

              {/* Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm">
                <Flame size={14} className="text-accent-foreground" />
                <span className="font-body text-xs font-bold uppercase tracking-wider text-accent-foreground">Plat du jour</span>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(25,30%,14%)] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="px-5 pb-5 -mt-6 relative z-10">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-primary uppercase tracking-wider mb-1">
                  {name}
                </h3>
                <p className="font-display text-lg font-bold text-accent mb-2">{price}</p>
                {description && (
                  <p className="font-body text-sm text-muted-foreground italic mb-4 leading-relaxed">
                    {description}
                  </p>
                )}

                {/* Commander button - circular style */}
                <div className="flex items-center justify-center pt-2">
                  <a
                    href={getWhatsAppUrl(name, price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-[#25D366] shadow-lg shadow-[#25D366]/30 border-2 border-[#25D366]/50 transition-all group-hover:shadow-[#25D366]/50 group-hover:shadow-xl"
                    >
                      <ShoppingBag size={24} className="text-white" />
                    </motion.div>
                    <span className="font-body text-xs font-bold uppercase tracking-wider text-primary/80 group-hover:text-primary transition-colors">
                      Commander
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PlatDuJourPopup;
