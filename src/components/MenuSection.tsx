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
  backgroundImage?: string;
}

const MenuSection = ({ title, items, variant = "default", delay = 0, backgroundImage }: MenuSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className="menu-section-card overflow-hidden"
    >
      {/* Background image */}
      {backgroundImage && (
        <div className="menu-section-bg">
          <img src={backgroundImage} alt="" loading="lazy" />
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Section title */}
        <div className="section-title-banner">
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-primary">
            {title}
          </h3>
        </div>

        {/* Items */}
        <div className="space-y-2">
          {items.map((item, i) => (
            <motion.div
              key={item.name + i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + i * 0.04 }}
              className="menu-item-row"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-body text-sm sm:text-base text-foreground font-bold leading-tight uppercase">
                    {item.emoji && <span className="mr-1">{item.emoji}</span>}
                    {item.name}
                  </span>
                  <span className="dotted-leader" />
                  <span className="price-tag">
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 italic leading-snug">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuSection;
