import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  emoji?: string;
}

interface MenuSectionProps {
  title: string;
  icon: string;
  items: MenuItem[];
  variant: "hot" | "cold";
  delay?: number;
}

const MenuSection = ({ title, icon, items, variant, delay = 0 }: MenuSectionProps) => {
  const isHot = variant === "hot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl p-6 ${
        isHot
          ? "bg-gradient-to-br from-secondary to-cream border border-warm-orange/20"
          : "bg-gradient-to-br from-blue-50 to-cyan-50 border border-cyan-200/40"
      }`}
    >
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <span className={isHot ? "text-chocolate" : "text-cyan-700"}>
          {title}
        </span>
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.05 }}
            className="flex justify-between items-baseline gap-2"
          >
            <span className="font-body text-foreground">
              {item.name} {item.emoji || ""}
            </span>
            <span className="flex-1 border-b border-dotted border-muted-foreground/30 min-w-[2rem] mx-1" />
            <span className="font-body font-bold text-accent whitespace-nowrap">
              {item.price}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MenuSection;
