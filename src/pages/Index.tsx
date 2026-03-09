import { motion } from "framer-motion";
import logo from "@/assets/neriyo-logo.jpeg";
import MenuSection from "@/components/MenuSection";

const cafeChaud = [
  { name: "Expresso", price: "500 Fr" },
  { name: "Double Expresso", price: "1 000 Fr" },
  { name: "Americano", price: "1 000 Fr" },
  { name: "Café Latté", price: "1 500 Fr" },
  { name: "Cappuccino", price: "1 500 Fr" },
  { name: "Moca", price: "2 000 Fr" },
];

const cafeGlace = [
  { name: "Americano", price: "2 000 Fr" },
  { name: "Café Latté", price: "2 500 Fr" },
  { name: "Caramel Expresso", price: "2 500 Fr" },
  { name: "Moca", price: "2 500 Fr" },
  { name: "Café Latté Caramel Spéculoos", price: "3 000 Fr" },
];

const theChaud = [
  { name: "Thé Lipton", price: "500 Fr" },
  { name: "Thé Infusion Neriyo", price: "1 000 Fr" },
  { name: "Thé Infusion Gingembre Menthe", price: "1 500 Fr" },
];

const theFroid = [
  { name: "Thé Mojito Citron", price: "1 500 Fr", emoji: "🍋" },
  { name: "Thé Mojito Pêche", price: "1 500 Fr", emoji: "🍑" },
  { name: "Thé Mojito Fraise", price: "1 500 Fr", emoji: "🍓" },
  { name: "Thé Mojito Orange", price: "1 500 Fr", emoji: "🍊" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center pt-10 pb-6 px-4"
      >
        <img
          src={logo}
          alt="Neriyo - la bouchée gourmande"
          className="w-64 md:w-80 mb-4"
        />
        <p className="font-body text-muted-foreground text-sm tracking-widest uppercase">
          Menu des boissons
        </p>
      </motion.header>

      {/* Menu */}
      <main className="max-w-2xl mx-auto px-4 pb-16 space-y-10">
        {/* Café */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl font-bold text-chocolate text-center mb-6"
          >
            ☕ Café
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <MenuSection title="Chaud 🔥" icon="☕" items={cafeChaud} variant="hot" delay={0.3} />
            <MenuSection title="Glacé ❄️" icon="🧊" items={cafeGlace} variant="cold" delay={0.4} />
          </div>
        </section>

        {/* Thé */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-display text-2xl font-bold text-chocolate text-center mb-6"
          >
            🍵 Thé
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <MenuSection title="Chaud 🔥" icon="🍵" items={theChaud} variant="hot" delay={0.5} />
            <MenuSection title="Froids ❄️" icon="🧊" items={theFroid} variant="cold" delay={0.6} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="font-body text-sm text-muted-foreground">
          © 2026 Neriyo — La bouchée gourmande
        </p>
      </footer>
    </div>
  );
};

export default Index;
