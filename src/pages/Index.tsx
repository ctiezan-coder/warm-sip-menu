import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import logo from "@/assets/neriya-logo.png";
import heroImg from "@/assets/hero-with-logo.jpg";

import MenuSection from "@/components/MenuSection";
import MenuSoupeSection from "@/components/MenuSoupeSection";

import {
  categories,
  cafeChaud, cafeGlace, theChaud, theFroid, chocolatChaud, milkshakes, jusNaturel,
  dejFermier, crepeSalee, crepeSucree,
  painsPerdu, pancakes, croissantGauffre, crepesDessert, degue,
  tchep, yassa, mafe, sauceTomate, sauceLegume, soupe,
  type CategoryKey,
} from "@/data/menuData";

const MenuPlatDuJourSection = MenuSoupeSection;

// ─── CATEGORY CONTENT ─────────────────────────────────────
const CategoryContent = ({ category }: { category: CategoryKey }) => {
  switch (category) {
    case "petit-dejeuner":
      return (
        <div className="space-y-5">
          <MenuSection title="Déj Fermier 🍳" items={dejFermier} delay={0.1} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Crêpe Salée 🧂" items={crepeSalee} delay={0.15} />
            <MenuSection title="Crêpe Sucrée 🍫" items={crepeSucree} delay={0.2} />
          </div>
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "dejeuner":
      return (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Tchêp 🍛" items={tchep} delay={0.1} />
            <MenuSection title="Yassa 🍗" items={yassa} delay={0.15} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuPlatDuJourSection title="Mafé 🥜 — Sauce Arachide" items={mafe} delay={0.2} />
            <div className="space-y-4">
              <MenuPlatDuJourSection title="Sauce Tomate 🍅" items={sauceTomate} delay={0.25} />
              <MenuPlatDuJourSection title="Sauce Légume 🥬" items={sauceLegume} delay={0.3} />
            </div>
          </div>
          <MenuPlatDuJourSection title="Soupe 🍲" items={soupe} delay={0.35} />
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "diner":
      return (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Tchêp 🍛" items={tchep} delay={0.1} />
            <MenuSection title="Yassa 🍗" items={yassa} delay={0.15} />
          </div>
          <MenuPlatDuJourSection title="Soupe 🍲" items={soupe} delay={0.2} />
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "dessert":
      return (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Pancakes 🥞" items={pancakes} delay={0.1} />
            <MenuSection title="Croissant Gauffre 🧇" items={croissantGauffre} delay={0.15} />
          </div>
          <MenuSection title="Crêpes Sucrées 🥞" items={crepesDessert} delay={0.2} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Pains Perdu 🍞" items={painsPerdu} delay={0.25} />
            <MenuSection title="Dêguê & Lait Caillé 🥛" items={degue} delay={0.3} />
          </div>
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "boissons":
      return (
        <div className="space-y-5">
          <div className="section-title-banner !mb-4 !bg-accent/10 !border-accent/30">
            <span className="font-display text-base font-bold uppercase tracking-widest text-accent">🔥 Boissons Chaudes</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Cafés ☕" items={cafeChaud} variant="hot" delay={0.1} />
            <div className="space-y-4">
              <MenuSection title="Thés 🍵" items={theChaud} variant="hot" delay={0.15} />
              <MenuSection title="Chocolats 🍫" items={chocolatChaud} variant="hot" delay={0.2} />
            </div>
          </div>
          <div className="chalk-line my-4" />
          <div className="section-title-banner !mb-4 !bg-primary/5 !border-primary/30">
            <span className="font-display text-base font-bold uppercase tracking-widest text-primary">❄️ Boissons Froides</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Cafés Glacés ☕" items={cafeGlace} variant="cold" delay={0.25} />
            <MenuSection title="Thés Froids 🍵" items={theFroid} variant="cold" delay={0.3} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MenuSection title="Milkshakes 🥤" items={milkshakes} variant="cold" delay={0.35} />
            <MenuSection title="Jus & Boissons 🧃" items={jusNaturel} delay={0.4} />
          </div>
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
  }
};

// ─── DECORATIVE ORNAMENT ──────────────────────────────────
const GoldOrnament = () => (
  <div className="flex items-center justify-center gap-4 py-3">
    <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />
    <Sparkles size={14} className="text-primary/40" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────
const Index = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);

  const activeCat = categories.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-screen chalkboard-bg">
      <AnimatePresence mode="wait">
        {activeCategory && activeCat ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative h-56 sm:h-80 overflow-hidden">
              <motion.img
                src={activeCat.image}
                alt={activeCat.label}
                className="w-full h-full object-cover"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-background" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onClick={() => setActiveCategory(null)}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 glass-card text-foreground font-body text-sm px-4 py-2.5 rounded-full hover:border-primary/20 active:scale-95"
              >
                <ArrowLeft size={16} />
                Retour
              </motion.button>
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
                >
                  <span className="text-4xl sm:text-5xl block mb-3 drop-shadow-lg">{activeCat.emoji}</span>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-[0.18em] drop-shadow-lg">
                    {activeCat.label}
                  </h1>
                  <p className="font-body text-sm text-white/50 mt-2 tracking-wide max-w-xs mx-auto">{activeCat.description}</p>
                </motion.div>
              </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 space-y-6 mt-4" aria-label={`Menu ${activeCat.label}`}>
              <GoldOrnament />
              <CategoryContent category={activeCategory} />
              <GoldOrnament />
              <p className="font-body text-xs text-muted-foreground text-center italic tracking-wide pt-2">
                Tous les prix sont en FCFA · Service compris
              </p>
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[52vh] sm:h-[58vh] overflow-hidden grain-overlay">
              <motion.img
                src={heroImg}
                alt="Neriya — La bouchée gourmande"
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-background" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              
              <motion.div
                className="absolute bottom-10 sm:bottom-14 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              >
                <p className="font-script text-primary text-2xl sm:text-3xl drop-shadow-lg">La bouchée gourmande</p>
              </motion.div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-2 relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-4 mb-6"
              >
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/40" />
                <span className="font-display text-sm uppercase tracking-[0.3em] text-primary/70">Notre Carte</span>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/40" />
              </motion.div>
            </div>

            <nav className="max-w-3xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 relative z-10" aria-label="Catégories du menu">
              <div className="grid gap-4 sm:gap-5" role="list">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.key}
                    role="listitem"
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    aria-label={`${cat.label} — ${cat.description}`}
                    onClick={() => {
                      setActiveCategory(cat.key);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative overflow-hidden rounded-2xl h-28 sm:h-32 text-left gold-glow shimmer-hover hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 category-card-overlay group-hover:opacity-90 transition-opacity duration-500" />

                    <div className="relative h-full flex items-center justify-between px-5 sm:px-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl sm:text-4xl drop-shadow-md">{cat.emoji}</span>
                          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground dark:text-white uppercase tracking-wider drop-shadow-sm">
                            {cat.label}
                          </h2>
                        </div>
                        <p className="font-body text-xs sm:text-sm text-muted-foreground dark:text-white/50 ml-12 sm:ml-[3.25rem] tracking-wide">{cat.description}</p>
                      </div>
                      <ChevronRight size={24} className="text-primary/50 group-hover:text-primary group-hover:translate-x-1.5 transition-all duration-300 shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </nav>

            <footer className="relative border-t border-primary/8 py-12 px-4">
              <div className="max-w-md mx-auto text-center space-y-4">
                <div className="flex items-center justify-center gap-4 mb-5">
                  <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/20 to-primary/30" />
                  <img src={logo} alt="Neriya" className="h-11 w-11 rounded-full object-cover opacity-80 ring-2 ring-primary/15 ring-offset-2 ring-offset-background" />
                  <div className="h-px w-20 bg-gradient-to-l from-transparent via-primary/20 to-primary/30" />
                </div>
                <p className="font-script text-primary text-xl">Neriya</p>
                <p className="font-body text-xs text-muted-foreground italic tracking-wide">
                  Tous les prix sont en FCFA · Service compris
                </p>
                <p className="font-body text-[11px] text-muted-foreground/50">
                  © 2026 — La bouchée gourmande
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/2250789288202?text=Bonjour%20Neriya%20!%20Je%20souhaite%20passer%20une%20commande%20🍽️"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-body font-bold text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 whatsapp-pulse"
      >
        <MessageCircle size={20} fill="white" strokeWidth={0} />
        Commander
      </a>
    </div>
  );
};

export default Index;
