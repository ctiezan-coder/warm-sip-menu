import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface SoupeItem {
  name: string;
  price: string;
  description?: string;
}

interface MenuSoupeSectionProps {
  items: SoupeItem[];
  delay?: number;
}

const MenuSoupeSection = ({ items, delay = 0 }: MenuSoupeSectionProps) => {
  const [platDuJour, setPlatDuJour] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded-lg border border-border bg-card/50 p-5"
    >
      <h3 className="font-script text-xl mb-3 text-primary">Nos Soupes</h3>

      {/* Dropdown plat du jour */}
      <div className="mb-4 flex items-center gap-2">
        <Star size={16} className="text-gold shrink-0" />
        <label className="font-body text-xs text-muted-foreground whitespace-nowrap">Plat du jour :</label>
        <select
          value={platDuJour ?? ""}
          onChange={(e) => setPlatDuJour(e.target.value === "" ? null : Number(e.target.value))}
          className="flex-1 bg-background/60 border border-primary/20 rounded-md px-2 py-1 font-body text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
        >
          <option value="">— Aucun —</option>
          {items.map((item, i) => (
            <option key={i} value={i}>{item.name}</option>
          ))}
        </select>
      </div>

      <ul className="space-y-2.5">
        {/* Plat du jour en premier, mis en avant */}
        {platDuJour !== null && (
          <motion.li
            key="plat-du-jour"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-md border border-gold/30 bg-gold/10 p-3 mb-3"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Star size={14} className="text-gold fill-gold" />
              <span className="font-body text-[10px] uppercase tracking-widest text-gold font-semibold">Plat du jour</span>
            </div>
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-body text-sm text-foreground font-semibold">
                {items[platDuJour].name}
              </span>
              <span className="flex-1 border-b border-dotted border-gold/30 min-w-[1rem] mx-1 translate-y-[-3px]" />
              <span className="font-body text-sm font-bold text-gold whitespace-nowrap">
                {items[platDuJour].price}
              </span>
            </div>
            {items[platDuJour].description && (
              <p className="text-xs text-muted-foreground mt-0.5 italic">{items[platDuJour].description}</p>
            )}
          </motion.li>
        )}

        {/* Reste des items */}
        {items.map((item, i) => {
          if (i === platDuJour) return null;
          return (
            <motion.li
              key={item.name + i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + i * 0.03 }}
            >
              <div className="flex justify-between items-baseline gap-2">
                <span className="font-body text-sm text-foreground">{item.name}</span>
                <span className="flex-1 border-b border-dotted border-muted-foreground/20 min-w-[1rem] mx-1 translate-y-[-3px]" />
                <span className="font-body text-sm font-semibold text-primary whitespace-nowrap">{item.price}</span>
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-0.5 italic">{item.description}</p>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default MenuSoupeSection;
