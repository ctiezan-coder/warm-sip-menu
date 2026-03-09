import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  emoji?: string;
  description?: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  variant?: "hot" | "cold" | "default";
  delay?: number;
  columns?: 1 | 2;
}

const MenuSection = ({ title, items, variant = "default", delay = 0 }: MenuSectionProps) => {
  const accentColor = {
    hot: "text-accent",
    cold: "text-primary",
    default: "text-primary",
  };

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
        <h3 className={`font-display text-base sm:text-lg font-semibold uppercase tracking-wider ${accentColor[variant]}`}>
          {title}
        </h3>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
      </div>

      {/* Items */}
      <ul className="space-y-1">
        {items.map((item, i) => (
          <motion.li
            key={item.name + i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: delay + i * 0.02 }}
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-body text-sm text-foreground leading-relaxed">
                {item.emoji && <span className="mr-1">{item.emoji}</span>}
                {item.name}
              </span>
              <span className="flex-1 border-b border-dotted border-foreground/15 min-w-[12px] translate-y-[-2px]" />
              <span className="font-body text-sm font-bold text-primary whitespace-nowrap">
                {item.price}
              </span>
            </div>
            {item.description && (
              <p className="text-[11px] text-muted-foreground ml-1 italic leading-tight">{item.description}</p>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MenuSection;
