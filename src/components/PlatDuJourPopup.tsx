import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Flame, Star, ChevronDown, Plus } from "lucide-react";
import logo from "@/assets/neriya-logo.png";
import { useCart } from "@/contexts/CartContext";

interface TchepVariant {
  label: string;
  price: string;
}

interface PlatDuJourPopupProps {
  name: string;
  price: string;
  description?: string;
  image: string;
  variants?: TchepVariant[];
}

const getWhatsAppUrl = (itemName: string, price: string) => {
  const message = `Bonjour Neriya ! 🍽️ Je souhaite commander :\n\n⭐ *${itemName}* (Plat du jour) — ${price}\n\nMerci de me confirmer ma commande ! 😊`;
  return `https://wa.me/2250789288202?text=${encodeURIComponent(message)}`;
};

const PlatDuJourPopup = ({ name, price, description, image, variants }: PlatDuJourPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [selectOpen, setSelectOpen] = useState(false);

  const currentPrice = variants && variants.length > 0 ? variants[selectedVariant].price : price;
  const currentLabel = variants && variants.length > 0 ? variants[selectedVariant].label : name;

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
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md pointer-events-auto rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(160deg, hsl(25 30% 14%), hsl(28 25% 12%))",
                border: "1.5px solid hsl(42 65% 55% / 0.25)",
                boxShadow: "0 25px 80px -12px hsl(0 0% 0% / 0.7), inset 0 1px 0 hsl(42 65% 65% / 0.1)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-primary/20 text-foreground/60 hover:text-foreground hover:bg-black/70 transition-all hover:scale-110"
              >
                <X size={18} />
              </button>

              {/* Logo floating top-center */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 20 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 shadow-lg shadow-black/40 bg-card">
                  <img src={logo} alt="Neriya" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-5 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent shadow-lg shadow-accent/30"
              >
                <Flame size={13} className="text-accent-foreground" />
                <span className="font-body text-[11px] font-extrabold uppercase tracking-wider text-accent-foreground">
                  Plat du jour
                </span>
              </motion.div>

              {/* Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(25,30%,14%)] via-[hsl(25,30%,14%,0.3)] to-transparent" />
                {/* Decorative stars */}
                <div className="absolute bottom-4 left-5 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-primary fill-primary" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-7 -mt-4 relative z-10">
                {/* Title row */}
                <div className="flex items-end justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <p className="font-script text-primary/60 text-sm mb-0.5">Recommandation du chef</p>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wide leading-tight">
                      {name}
                    </h3>
                  </div>
                  <div className="shrink-0 px-4 py-2 rounded-xl bg-accent/15 border border-accent/25">
                    <span className="font-display text-xl sm:text-2xl font-bold text-accent">{currentPrice}</span>
                  </div>
                </div>

                {/* Variant selector */}
                {variants && variants.length > 0 && (
                  <div className="relative mb-3">
                    <button
                      onClick={() => setSelectOpen(!selectOpen)}
                      className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-card/50 border border-primary/20 text-foreground font-body text-sm hover:border-primary/40 transition-colors"
                    >
                      <span className="font-semibold">{currentLabel}</span>
                      <ChevronDown size={16} className={`text-primary/60 transition-transform ${selectOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {selectOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 right-0 mt-1 z-30 rounded-xl overflow-hidden border border-primary/20 bg-card/95 backdrop-blur-md shadow-xl"
                        >
                          {variants.map((v, i) => (
                            <button
                              key={i}
                              onClick={() => { setSelectedVariant(i); setSelectOpen(false); }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-body transition-colors hover:bg-primary/10 ${
                                i === selectedVariant ? 'bg-primary/15 text-primary font-semibold' : 'text-foreground/80'
                              }`}
                            >
                              <span>{v.label}</span>
                              <span className="text-accent font-semibold">{v.price}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/25 to-transparent mb-3" />

                {description && (
                  <p className="font-body text-sm sm:text-base text-muted-foreground italic mb-5 leading-relaxed">
                    {description}
                  </p>
                )}

                {/* Commander button */}
                <div className="flex items-center justify-center pt-1">
                  <a
                    href={getWhatsAppUrl(currentLabel, currentPrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2.5"
                  >
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      animate={{
                        boxShadow: [
                          "0 0 20px 0px rgba(37,211,102,0.3)",
                          "0 0 35px 5px rgba(37,211,102,0.5)",
                          "0 0 20px 0px rgba(37,211,102,0.3)",
                        ],
                      }}
                      transition={{
                        boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#25D366] border-[3px] border-[#25D366]/40 transition-all"
                    >
                      <ShoppingBag size={28} className="text-white" />
                    </motion.div>
                    <span className="font-body text-xs font-bold uppercase tracking-[0.15em] text-primary/70 group-hover:text-primary transition-colors">
                      Commander
                    </span>
                  </a>
                </div>

                {/* Info badges */}
                <div className="flex items-center justify-center gap-2 pt-3 flex-wrap">
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 font-body text-[11px] font-bold uppercase tracking-wider text-primary/80">
                    🍽️ Sur place
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 font-body text-[11px] font-bold uppercase tracking-wider text-primary/80">
                    🛵 Livraison
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-accent/15 border border-accent/25 font-body text-[11px] font-bold uppercase tracking-wider text-accent">
                    ✅ Ouvert au public
                  </span>
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
