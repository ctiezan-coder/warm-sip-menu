import { motion } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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

/** Lowercase text inside parentheses */
const lowercaseParens = (text: string): string =>
  text.replace(/\(([^)]*)\)/g, (_, inner) => `(${inner.toLowerCase()})`);

/** Parse a price string that may contain two prices separated by "/" */
const parseDualPrice = (price: string): string[] => {
  // Match patterns like "2 500 / 3 000 FCFA" or "2 500 / 3 000 Fr"
  const match = price.match(/^(.+?)\s*\/\s*(.+)$/);
  if (match) {
    const suffix = match[2].match(/(FCFA|Fr|CFA)/i);
    const suffixStr = suffix ? ` ${suffix[1]}` : "";
    let p1 = match[1].trim();
    let p2 = match[2].trim();
    // If first part doesn't have suffix, add it
    if (suffix && !p1.match(/(FCFA|Fr|CFA)/i)) {
      p1 = `${p1}${suffixStr}`;
    }
    return [p1, p2];
  }
  return [price];
};

const AddToCartButton = ({ name, price, label }: { name: string; price: string; label?: string }) => {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(name, price)}
      className="ml-1 shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/15 hover:bg-primary/30 border border-primary/20 hover:border-primary/40 text-primary text-[10px] font-body font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
      title={`Ajouter ${name} au panier`}
    >
      <Plus size={12} />
      <span className="hidden sm:inline">{label || "Ajouter"}</span>
    </button>
  );
};

const MenuSection = ({ title, items, variant = "default", delay = 0, backgroundImage, imagePosition = "right" }: MenuSectionProps) => {
  const imageBlock = backgroundImage && (
    <div className="menu-section-hero-img">
      <img src={backgroundImage} alt={title} loading="lazy" />
    </div>
  );

  return (
    <div className="menu-section-card-v2">
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
          {items.map((item, i) => {
            const prices = parseDualPrice(item.price);
            const isDual = prices.length === 2;

            return (
              <div key={item.name + i} className="menu-item-row-v2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="menu-item-name-v2 shrink min-w-0" style={{ maxWidth: '55%' }}>
                      {item.emoji && <span className="mr-1 text-base">{item.emoji}</span>}
                      {lowercaseParens(item.name)}
                    </span>
                    <span className="menu-item-dots-v2" />
                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className="menu-item-price-v2">{item.price}</span>
                      {isDual ? (
                        <>
                          <AddToCartButton name={item.name} price={prices[0]} label={prices[0]} />
                          <AddToCartButton name={item.name} price={prices[1]} label={prices[1]} />
                        </>
                      ) : (
                        <AddToCartButton name={item.name} price={item.price} />
                      )}
                    </div>
                  </div>
                  {item.description && (
                    <p className="menu-item-desc-v2">{item.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hero image */}
        {imageBlock}
      </div>
    </div>
  );
};

export default MenuSection;
