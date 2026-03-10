import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  price: string;
  emoji?: string;
  description?: string;
  image?: string;
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

  const priceColor = {
    hot: "text-accent",
    cold: "text-primary",
    default: "text-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className="menu-section-card"
    >
      {/* Section sub-title */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/25" />
        <h3 className={`font-display text-lg sm:text-xl font-semibold uppercase tracking-[0.12em] ${accentColor[variant]}`}>
          {title}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/25" />
      </div>

      {/* Items */}
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={item.name + i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + i * 0.03 }}
            className="group"
          >
            <div className="flex items-center gap-3">
              {/* Food photo */}
              {item.image && (
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-primary/20 shadow-md group-hover:border-primary/40 transition-all">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-base sm:text-lg text-foreground leading-relaxed font-medium group-hover:text-chalk transition-colors">
                    {item.emoji && <span className="mr-1.5">{item.emoji}</span>}
                    {item.name}
                  </span>
                  <span className="flex-1 border-b border-dotted border-primary/15 min-w-[16px] translate-y-[-3px]" />
                  <span className={`font-body text-base sm:text-lg font-bold ${priceColor[variant]} whitespace-nowrap`}>
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground ml-1 mt-0.5 italic leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MenuSection;
