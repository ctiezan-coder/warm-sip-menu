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
  sectionImage?: string;
}

const MenuSection = ({ title, items, variant = "default", delay = 0, sectionImage }: MenuSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="menu-section-card"
    >
      {/* Section title with optional image */}
      <div className="flex items-center gap-3 mb-3">
        {sectionImage && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-primary/20 flex-shrink-0 shadow-md">
            <img src={sectionImage} alt={title} loading="lazy" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="section-title-banner flex-1">
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-primary">
            {title}
          </h3>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.name + i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: delay + i * 0.04, ease: "easeOut" }}
            className="menu-item-row group"
          >
            {/* Thumbnail */}
            {item.image && (
              <div className="item-thumbnail">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
            )}

            {/* Name + Price */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-body text-sm sm:text-base text-foreground font-bold leading-tight uppercase">
                  {item.emoji && <span className="mr-1">{item.emoji}</span>}
                  {item.name}
                </span>
                <span className="dotted-leader" />
                <span className="price-tag">{item.price}</span>
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
    </motion.div>
  );
};

export default MenuSection;
