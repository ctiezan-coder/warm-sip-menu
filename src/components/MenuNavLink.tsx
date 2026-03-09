import { motion } from "framer-motion";

interface MenuNavLinkProps {
  label: string;
  emoji: string;
  targetId: string;
  isActive?: boolean;
}

const MenuNavLink = ({ label, emoji, targetId, isActive }: MenuNavLinkProps) => {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`px-3 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-primary/20"
      }`}
    >
      <span className="mr-1">{emoji}</span>
      {label}
    </motion.button>
  );
};

export default MenuNavLink;
