import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatMenuName } from "@/lib/utils";

interface SoupeItem {
  name: string;
  price: string;
  description?: string;
}

interface MenuPlatDuJourSectionProps {
  title: string;
  items: SoupeItem[];
  delay?: number;
}

const OrderButton = ({ name, price }: { name: string; price: string }) => {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(name, price)}
      className="ml-1.5 shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/15 hover:bg-primary/30 border border-primary/20 hover:border-primary/40 text-primary text-[10px] font-body font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
      title={`Ajouter ${name} au panier`}
    >
      <Plus size={12} />
      <span className="hidden sm:inline">Ajouter</span>
    </button>
  );
};

const MenuPlatDuJourSection = ({ title, items, delay = 0 }: MenuPlatDuJourSectionProps) => {
  const [platDuJour, setPlatDuJour] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="relative"
    >
      {/* Section sub-title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
        <h3 className="font-display text-lg sm:text-xl font-semibold uppercase tracking-wider text-primary">
          {title}
        </h3>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
      </div>

      {/* Plat du jour selector */}
      <div className="mb-3 flex items-center gap-2">
        <Star size={14} className="text-accent shrink-0" />
        <label className="font-body text-[11px] text-muted-foreground whitespace-nowrap uppercase tracking-wider">Plat du jour :</label>
        <select
          value={platDuJour ?? ""}
          onChange={(e) => setPlatDuJour(e.target.value === "" ? null : Number(e.target.value))}
          className="flex-1 bg-background/60 border border-primary/20 rounded px-2 py-1 font-body text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
        >
          <option value="">— Aucun —</option>
          {items.map((item, i) => (
            <option key={i} value={i}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* Items */}
      <ul className="space-y-2">
        {/* Highlighted plat du jour */}
        {platDuJour !== null && (
          <motion.li
            key="plat-du-jour"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative border border-accent/30 rounded px-3 py-2 mb-2 bg-accent/5"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Star size={12} className="text-accent fill-accent" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-semibold">Plat du jour</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-body text-base sm:text-lg text-foreground font-semibold">{formatMenuName(items[platDuJour].name)}</span>
              <span className="flex-1 border-b border-dotted border-accent/30 min-w-[12px] translate-y-[-2px]" />
              <span className="font-body text-base sm:text-lg font-bold text-accent whitespace-nowrap">{items[platDuJour].price}</span>
              <OrderButton name={items[platDuJour].name} price={items[platDuJour].price} />
            </div>
            {items[platDuJour].description && (
              <p className="text-xs text-muted-foreground mt-0.5 italic">{items[platDuJour].description}</p>
            )}
          </motion.li>
        )}

        {items.map((item, i) => {
          if (i === platDuJour) return null;
          return (
            <motion.li
              key={item.name + i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: delay + i * 0.02 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-body text-base sm:text-lg text-foreground leading-relaxed font-medium">{item.name}</span>
                <span className="flex-1 border-b border-dotted border-foreground/15 min-w-[12px] translate-y-[-2px]" />
                <span className="font-body text-base sm:text-lg font-bold text-primary whitespace-nowrap">{item.price}</span>
                <OrderButton name={item.name} price={item.price} />
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground ml-1 italic leading-tight">{item.description}</p>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default MenuPlatDuJourSection;
