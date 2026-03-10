import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

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
  backgroundImage?: string;
  imagePosition?: "left" | "right";
}

const getWhatsAppUrl = (itemName: string, price: string) => {
  const message = `Bonjour Neriya ! 🍽️ Je souhaite commander :\n\n🍴 *${itemName}* — ${price}\n\nMerci de me confirmer ma commande ! 😊`;
  return `https://wa.me/2250789288202?text=${encodeURIComponent(message)}`;
};

const MenuSection = ({ title, items, variant = "default", delay = 0, backgroundImage, imagePosition = "right" }: MenuSectionProps) => {
  const imageBlock = backgroundImage && (
    <div className="menu-section-hero-img">
      <img src={backgroundImage} alt={title} loading="lazy" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="menu-section-card-v2"
    >
      {/* Title */}
      <div className="menu-section-title-v2">
        <div className="menu-section-title-line" />
        <h3>{title}</h3>
        <div className="menu-section-title-line" />
      </div>

      {/* Content: image + items */}
      <div className={`menu-section-content-v2 ${imagePosition === "left" ? "flex-row-reverse" : ""}`}>
        {/* Items list */}
        <div className="menu-section-items-v2">
          {items.map((item, i) => (
            <motion.div
              key={item.name + i}
              initial={{ opacity: 0, x: imagePosition === "left" ? 8 : -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + i * 0.05 }}
              className="menu-item-row-v2"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="menu-item-name-v2">
                    {item.emoji && <span className="mr-1.5 text-base">{item.emoji}</span>}
                    {item.name}
                  </span>
                  <span className="menu-item-dots-v2" />
                  <span className="menu-item-price-v2">
                    {item.price}
                  </span>
                  <a
                    href={getWhatsAppUrl(item.name, item.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1.5 shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#25D366]/15 hover:bg-[#25D366]/30 border border-[#25D366]/20 hover:border-[#25D366]/40 text-[#25D366] text-[10px] font-body font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                    title={`Commander ${item.name}`}
                  >
                    <ShoppingBag size={12} />
                    <span className="hidden sm:inline">Commander</span>
                  </a>
                </div>
                {item.description && (
                  <p className="menu-item-desc-v2">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero image */}
        {imageBlock}
      </div>
    </motion.div>
  );
};

export default MenuSection;
