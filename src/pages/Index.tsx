import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/neriyo-logo.jpeg";
import MenuSection from "@/components/MenuSection";
import MenuSoupeSection from "@/components/MenuSoupeSection";
import MenuNavLink from "@/components/MenuNavLink";

// Alias for readability
const MenuPlatDuJourSection = MenuSoupeSection;

// ─── BOISSONS ────────────────────────────────────────────
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
  { name: "Thé Fruit de la Passion Coco", price: "2 000 Fr", emoji: "🥥" },
];

const chocolatChaud = [
  { name: "Chocolat Chaud Classique", price: "2 000 Fr" },
  { name: "Chocolat Chaud Chantilly", price: "2 500 Fr" },
  { name: "Crazy Chocolat – Guimauve & Chantilly", price: "3 500 Fr" },
];

const milkshakes = [
  { name: "Vanille", price: "2 000 Fr" },
  { name: "Menthe", price: "2 000 Fr" },
  { name: "Fraise", price: "2 500 Fr", emoji: "🍓" },
  { name: "Kinder Bueno", price: "2 500 Fr" },
  { name: "Spéculoos Caramel Beurre Salé", price: "2 500 Fr" },
  { name: "Chocolat Oreo", price: "2 500 Fr" },
  { name: "Coco Bounty", price: "2 500 Fr" },
];

const jusNaturel = [
  { name: "Bissap", price: "1 000 Fr" },
  { name: "Gingembre", price: "1 000 Fr" },
  { name: "Citron", price: "1 000 Fr" },
  { name: "Sucrerie", price: "1 000 Fr" },
  { name: "Eau Minérale", price: "1 000 Fr" },
  { name: "Passion (selon saison)", price: "1 500 / 2 000 Fr" },
  { name: "Cocktail de Fruits", price: "2 000 Fr" },
];

// ─── DESSERTS ────────────────────────────────────────────
const pancakes = [
  { name: "Pancakes Nature", price: "1 000 Fr" },
  { name: "Pancakes Miel ou Caramel", price: "1 500 Fr" },
  { name: "Pancakes Nutella", price: "2 000 Fr" },
  { name: "Pancakes Caramel Fruit (saison)", price: "2 000 Fr" },
];

const croissantGauffre = [
  { name: "Vanille Spéculoos", price: "2 500 Fr" },
  { name: "Oreo", price: "2 500 Fr" },
  { name: "Fruits Rouges", price: "3 000 Fr" },
];

const crepes = [
  { name: "Crêpe Nature (miel facultatif)", price: "1 000 Fr" },
  { name: "Crêpe Nutella", price: "1 500 Fr" },
  { name: "Fettuccine Nutella", price: "3 000 Fr", description: "Nutella, boule de glace, coulis chocolat" },
  { name: "Fettuccine Oreo", price: "4 000 Fr", description: "Biscuits Oreo, boule de glace, coulis chocolat" },
  { name: "Fettuccine Spéculoos", price: "4 000 Fr", description: "Biscuits spéculoos, boule de glace, coulis chocolat" },
  { name: "Fettuccine Fruits Saisonniers", price: "5 500 Fr", description: "Fruits, granulats, glace, coulis 3 chocolats" },
  { name: "Crêpe Pralin", price: "6 000 Fr", description: "Crème pâtissière, fruits, biscottes, boule de glace" },
];

const autresDesserts = [
  { name: "Feuilleté de Pain Fourré", price: "6 000 Fr", description: "Crème pâtissière, boule de glace, fruits, spéculoos" },
  { name: "Croissant Vanille Pistache", price: "2 500 Fr" },
];

// ─── PLATS ───────────────────────────────────────────────
const tchep = [
  { name: "Tchêp Poulet", price: "2 000 / 2 500 Fr" },
  { name: "Tchêp Poisson", price: "2 000 / 2 500 Fr" },
  { name: "Tchêp Viande de Bœuf", price: "2 500 / 3 000 Fr" },
  { name: "Tchêp Mouton", price: "3 500 / 4 000 Fr" },
  { name: "Tchêp Boulette de Viande", price: "2 500 / 3 000 Fr" },
];

const yassa = [
  { name: "Yassa Poulet Riz", price: "2 500 Fr", emoji: "🍚" },
  { name: "Yassa Poulet Fonio", price: "3 000 / 3 500 Fr" },
  { name: "Yassa Poisson Riz", price: "2 500 / 3 000 Fr", emoji: "🍚" },
  { name: "Yassa Poisson Fonio", price: "3 000 / 3 500 Fr" },
  { name: "Yassa Mouton Riz", price: "3 500 / 4 500 Fr", emoji: "🍚" },
  { name: "Yassa Mouton Fonio", price: "4 000 / 5 000 Fr" },
];

const mafe = [
  { name: "Pondeuse Fumée (riz / Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚" },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr" },
  { name: "1 Pondeuse Entière (riz ou Fonio)", price: "9 000 / 11 000 Fr" },
  { name: "Poisson Fumé (riz ou Fonio)", price: "2 500 / 3 500 Fr", emoji: "🍚" },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr" },
];

const sauceTomate = [
  { name: "Sauce Tomate Boulette de Viande Riz", price: "2 500 Fr", emoji: "🍚" },
  { name: "Sauce Feuille de Viande de Bœuf Riz", price: "2 500 Fr", emoji: "🍚" },
];

const sauceLegume = [
  { name: "Pondeuse Fumée (riz ou Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚" },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr" },
  { name: "1 Pondeuse Entière (riz / Fonio)", price: "9 000 / 11 000 Fr" },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr" },
];

const soupe = [
  { name: "½ Pondeuse (riz, attiéké)", price: "5 000 Fr" },
  { name: "1 Pondeuse Entière (riz, attiéké)", price: "9 000 Fr" },
  { name: "Soupe Poulet Chair ½ (attiéké, riz)", price: "3 500 Fr" },
  { name: "Soupe Poulet Chair 1 entier (attiéké, riz)", price: "6 500 Fr" },
  { name: "Soupe Poisson (riz, attiéké)", price: "3 000 / 4 000 / 5 000 Fr", description: "Prix selon le poisson du jour" },
];

const navItems = [
  { label: "Café", emoji: "☕", targetId: "cafe" },
  { label: "Thé", emoji: "🍵", targetId: "the" },
  { label: "Chocolat", emoji: "🍫", targetId: "chocolat" },
  { label: "Milkshake", emoji: "🥤", targetId: "milkshake" },
  { label: "Jus", emoji: "🧃", targetId: "jus" },
  { label: "Desserts", emoji: "🍰", targetId: "desserts" },
  { label: "Tchêp", emoji: "🍛", targetId: "tchep" },
  { label: "Yassa", emoji: "🍗", targetId: "yassa" },
  { label: "Mafé", emoji: "🥜", targetId: "mafe" },
  { label: "Sauce Tom.", emoji: "🍅", targetId: "sauce-tomate" },
  { label: "Sauce Lég.", emoji: "🥬", targetId: "sauce-legume" },
  { label: "Soupe", emoji: "🍲", targetId: "soupe" },
];

const SectionTitle = ({ children, id, delay = 0 }: { children: React.ReactNode; id: string; delay?: number }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="scroll-mt-20 pt-4"
  >
    <h2 className="ornament-divider font-display text-2xl md:text-3xl font-bold text-primary text-center mb-6">
      <span>{children}</span>
    </h2>
  </motion.div>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState("cafe");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );
    navItems.forEach(({ targetId }) => {
      const el = document.getElementById(targetId);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen chalkboard-bg">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center pt-6 sm:pt-10 pb-4 px-3 sm:px-4"
      >
        <div className="relative">
          <img
            src={logo}
            alt="Neriyo — La bouchée gourmande"
            className="w-48 md:w-56 rounded-full border-2 border-primary/30 shadow-lg shadow-primary/10"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-primary/10 ring-offset-4 ring-offset-background" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-script text-primary text-2xl mt-4"
        >
          La bouchée gourmande
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-body text-muted-foreground text-xs tracking-[0.3em] uppercase mt-1"
        >
          Notre Menu
        </motion.p>
      </motion.header>

      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-2.5 px-4">
        <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <MenuNavLink key={item.targetId} {...item} isActive={activeSection === item.targetId} />
          ))}
        </div>
      </nav>

      {/* Menu Content */}
      <main className="max-w-3xl mx-auto px-4 pb-16 space-y-10 mt-6">

        {/* ── CAFÉ ── */}
        <SectionTitle id="cafe">☕ Café</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <MenuSection title="Chaud 🔥" items={cafeChaud} variant="hot" delay={0.1} />
          <MenuSection title="Glacé ❄️" items={cafeGlace} variant="cold" delay={0.15} />
        </div>

        {/* ── THÉ ── */}
        <SectionTitle id="the">🍵 Thé</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <MenuSection title="Chaud 🔥" items={theChaud} variant="hot" delay={0.1} />
          <MenuSection title="Froid ❄️" items={theFroid} variant="cold" delay={0.15} />
        </div>

        {/* ── CHOCOLAT CHAUD ── */}
        <SectionTitle id="chocolat">🍫 Chocolat Chaud</SectionTitle>
        <MenuSection title="Nos Chocolats" items={chocolatChaud} variant="hot" delay={0.1} />

        {/* ── MILKSHAKE ── */}
        <SectionTitle id="milkshake">🥤 Milkshake</SectionTitle>
        <MenuSection title="Saveurs" items={milkshakes} variant="cold" delay={0.1} />

        {/* ── JUS NATUREL ── */}
        <SectionTitle id="jus">🧃 Jus Naturel</SectionTitle>
        <MenuSection title="Jus & Boissons Fraîches" items={jusNaturel} delay={0.1} />

        {/* ── DESSERTS ── */}
        <SectionTitle id="desserts">🍰 Desserts</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <MenuSection title="Pancakes 🥞" items={pancakes} delay={0.1} />
          <MenuSection title="Croissant Gauffre" items={croissantGauffre} delay={0.15} />
        </div>
        <MenuSection title="Crêpes Sucrées 🥞" items={crepes} delay={0.2} />
        <MenuSection title="Spécialités" items={autresDesserts} delay={0.25} />

        {/* ── TCHÊP ── */}
        <SectionTitle id="tchep" delay={0.1}>🍛 Tchêp</SectionTitle>
        <MenuSection title="Nos Tchêp" items={tchep} delay={0.1} />

        {/* ── YASSA ── */}
        <SectionTitle id="yassa" delay={0.1}>🍗 Yassa</SectionTitle>
        <MenuSection title="Nos Yassa" items={yassa} delay={0.1} />

        {/* ── MAFÉ ── */}
        <SectionTitle id="mafe" delay={0.1}>🥜 Mafé (sauce arachide)</SectionTitle>
        <MenuPlatDuJourSection title="Nos Mafé" items={mafe} delay={0.1} />

        {/* ── SAUCE TOMATE ── */}
        <SectionTitle id="sauce-tomate" delay={0.1}>🍅 Sauce Tomate</SectionTitle>
        <MenuPlatDuJourSection title="Nos Sauces Tomate" items={sauceTomate} delay={0.1} />

        {/* ── SAUCE LÉGUME ── */}
        <SectionTitle id="sauce-legume" delay={0.1}>🥬 Sauce Légume</SectionTitle>
        <MenuPlatDuJourSection title="Nos Sauces Légume" items={sauceLegume} delay={0.1} />

        {/* ── SOUPE ── */}
        <SectionTitle id="soupe" delay={0.1}>🍲 Soupe</SectionTitle>
        <MenuPlatDuJourSection title="Nos Soupes" items={soupe} delay={0.1} />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="font-script text-primary text-lg">Neriyo</p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          © 2026 — La bouchée gourmande
        </p>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2250789288202?text=Bonjour%20Neriyo%20!%20Je%20souhaite%20passer%20une%20commande%20🍽️"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-body font-semibold text-sm px-5 py-3 rounded-full shadow-lg shadow-black/30 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle size={22} fill="white" strokeWidth={0} />
        Commander
      </a>
    </div>
  );
};

export default Index;
