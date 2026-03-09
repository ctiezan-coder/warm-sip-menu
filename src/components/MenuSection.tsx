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

const MenuSection = ({ title, items, variant = "default", delay = 0, columns = 1 }: MenuSectionProps) => {
  const variantStyles = {
    hot: "border-copper/20 bg-copper/5",
    cold: "border-primary/20 bg-primary/5",
    default: "border-border bg-card/50",
  };

  const tagColor = {
    hot: "text-copper",
    cold: "text-primary",
    default: "text-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-lg border p-5 ${variantStyles[variant]}`}
    >
      <h3 className={`font-script text-xl mb-4 ${tagColor[variant]}`}>
        {title}
      </h3>
      <ul className={`space-y-2.5 ${columns === 2 ? "sm:columns-2 sm:gap-x-6" : ""}`}>
        {items.map((item, i) => (
          <motion.li
            key={item.name + i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + i * 0.03 }}
            className="break-inside-avoid"
          >
            <div className="flex justify-between items-baseline gap-2">
              <span className="font-body text-sm text-foreground">
                {item.emoji && <span className="mr-1">{item.emoji}</span>}
                {item.name}
              </span>
              <span className="flex-1 border-b border-dotted border-muted-foreground/20 min-w-[1rem] mx-1 translate-y-[-3px]" />
              <span className="font-body text-sm font-semibold text-primary whitespace-nowrap">
                {item.price}
              </span>
            </div>
            {item.description && (
              <p className="text-xs text-muted-foreground mt-0.5 italic">{item.description}</p>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MenuSection;
