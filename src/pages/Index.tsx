import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import logo from "@/assets/neriya-logo.png";
import heroImg from "@/assets/hero-with-logo.jpg";
import catPetitDej from "@/assets/cat-petit-dejeuner.jpg";
import catDejeuner from "@/assets/cat-dejeuner.jpg";
import catDiner from "@/assets/cat-diner.jpg";
import catDessert from "@/assets/cat-dessert.jpg";
import catBoissons from "@/assets/cat-boissons.jpg";
import MenuSection from "@/components/MenuSection";


// ─── FOOD IMAGES ──────────────────────────────────────────
// Petit déjeuner / Desserts
import imgPainPerdu from "@/assets/food/pain-perdu.png";
import imgPainPerduCaramel from "@/assets/food/pain-perdu-caramel.png";
import imgFeuilletePain from "@/assets/food/feuillete-pain.png";
import imgPancakesNature from "@/assets/food/pancakes-nature.png";
import imgPancakesCaramel from "@/assets/food/pancakes-caramel.png";
import imgPancakesNutella from "@/assets/food/pancakes-nutella.png";
import imgPancakesFruit from "@/assets/food/pancakes-fruit.png";
import imgCroissantSpeculoos from "@/assets/food/croissant-gauffre-speculoos.png";
import imgCroissantOreo from "@/assets/food/croissant-gauffre-oreo.png";
import imgCroissantFruits from "@/assets/food/croissant-gauffre-fruits.png";
import imgCroissantPistache from "@/assets/food/croissant-pistache.png";
import imgCrepeNature from "@/assets/food/crepe-nature.png";
import imgCrepeNutella from "@/assets/food/crepe-nutella.png";
import imgCrepeFettNutella from "@/assets/food/crepe-fettuccine-nutella.png";
import imgCrepeFettOreo from "@/assets/food/crepe-fettuccine-oreo.png";
import imgCrepeFettSpeculoos from "@/assets/food/crepe-fettuccine-speculoos.png";
import imgCrepeFettFruits from "@/assets/food/crepe-fettuccine-fruits.png";
import imgCrepePralin from "@/assets/food/crepe-pralin.png";
import imgDegue from "@/assets/food/degue.png";
import imgPainLaitCaille from "@/assets/food/pain-lait-caille.png";
// Déjeuner / Dîner
import imgPouletRoti from "@/assets/food/poulet-roti.png";
import imgChawama from "@/assets/food/chawama.png";
import imgBurger from "@/assets/food/burger.png";
import imgTchepPoulet from "@/assets/food/tchep-poulet.png";
import imgTchepPoisson from "@/assets/food/tchep-poisson.png";
import imgTchepBoeuf from "@/assets/food/tchep-boeuf.png";
import imgTchepMouton from "@/assets/food/tchep-mouton.png";
import imgTchepBoulette from "@/assets/food/tchep-boulette.png";
import imgYassaPoulet from "@/assets/food/yassa-poulet.png";
import imgYassaPoisson from "@/assets/food/yassa-poisson.png";
import imgYassaMouton from "@/assets/food/yassa-mouton.png";
import imgMafePondeuse from "@/assets/food/mafe-pondeuse.png";
import imgMafePoisson from "@/assets/food/mafe-poisson.png";
import imgMafeBoeuf from "@/assets/food/mafe-boeuf.png";
import imgSauceTomate from "@/assets/food/sauce-tomate.png";
import imgSauceFeuille from "@/assets/food/sauce-feuille.png";
import imgSauceLegume from "@/assets/food/sauce-legume.png";
import imgSoupePoulet from "@/assets/food/soupe-poulet.png";
import imgSoupePoisson from "@/assets/food/soupe-poisson.png";
// Boissons
import imgCafeExpresso from "@/assets/food/cafe-expresso.png";
import imgCafeLatte from "@/assets/food/cafe-latte.png";
import imgCappuccino from "@/assets/food/cappuccino.png";
import imgCafeMoca from "@/assets/food/cafe-moca.png";
import imgCafeGlace from "@/assets/food/cafe-glace.png";
import imgCafeCaramelSpeculoos from "@/assets/food/cafe-caramel-speculoos.png";
import imgTheChaud from "@/assets/food/the-chaud.png";
import imgTheGingembreMenthe from "@/assets/food/the-gingembre-menthe.png";
import imgTheMojito from "@/assets/food/the-mojito.png";
import imgChocolatChaud from "@/assets/food/chocolat-chaud.png";
import imgChocolatCrazy from "@/assets/food/chocolat-crazy.png";
import imgMilkshakeVanille from "@/assets/food/milkshake-vanille.png";
import imgMilkshakeMenthe from "@/assets/food/milkshake-menthe.png";
import imgMilkshakeFraise from "@/assets/food/milkshake-fraise.png";
import imgMilkshakeKinder from "@/assets/food/milkshake-kinder.png";
import imgMilkshakeSpeculoos from "@/assets/food/milkshake-speculoos.png";
import imgMilkshakeOreo from "@/assets/food/milkshake-oreo.png";
import imgMilkshakeCoco from "@/assets/food/milkshake-coco.png";
import imgJusBissap from "@/assets/food/jus-bissap.png";
import imgJusGingembre from "@/assets/food/jus-gingembre.png";
import imgJusCitron from "@/assets/food/jus-citron.png";
import imgJusPassion from "@/assets/food/jus-passion.png";
import imgJusCocktail from "@/assets/food/jus-cocktail.png";
import imgEauMinerale from "@/assets/food/eau-minerale.png";



// ─── DATA ─────────────────────────────────────────────────
const cafeChaud = [
  { name: "Expresso", price: "500 Fr", image: imgCafeExpresso },
  { name: "Double Expresso", price: "1 000 Fr", image: imgCafeExpresso },
  { name: "Americano", price: "1 000 Fr", image: imgCafeExpresso },
  { name: "Café Latté", price: "1 500 Fr", image: imgCafeLatte },
  { name: "Cappuccino", price: "1 500 Fr", image: imgCappuccino },
  { name: "Moca", price: "2 000 Fr", image: imgCafeMoca },
];
const cafeGlace = [
  { name: "Americano", price: "2 000 Fr", image: imgCafeGlace },
  { name: "Café Latté", price: "2 500 Fr", image: imgCafeGlace },
  { name: "Caramel Expresso", price: "2 500 Fr", image: imgCafeGlace },
  { name: "Moca", price: "2 500 Fr", image: imgCafeMoca },
  { name: "Café Latté Caramel Spéculoos", price: "3 000 Fr", image: imgCafeCaramelSpeculoos },
];
const theChaud = [
  { name: "Thé Lipton", price: "500 Fr", image: imgTheChaud },
  { name: "Thé Infusion Neriya", price: "1 000 Fr", image: imgTheChaud },
  { name: "Thé Infusion Gingembre Menthe", price: "1 500 Fr", image: imgTheGingembreMenthe },
];
const theFroid = [
  { name: "Thé Mojito Citron", price: "1 500 Fr", emoji: "🍋", image: imgTheMojito },
  { name: "Thé Mojito Pêche", price: "1 500 Fr", emoji: "🍑", image: imgTheMojito },
  { name: "Thé Mojito Fraise", price: "1 500 Fr", emoji: "🍓", image: imgTheMojito },
  { name: "Thé Mojito Orange", price: "1 500 Fr", emoji: "🍊", image: imgTheMojito },
  { name: "Thé Fruit de la Passion Coco", price: "2 000 Fr", emoji: "🥥", image: imgJusPassion },
];
const chocolatChaud = [
  { name: "Chocolat Chaud Classique", price: "2 000 Fr", image: imgChocolatChaud },
  { name: "Chocolat Chaud Chantilly", price: "2 500 Fr", image: imgChocolatChaud },
  { name: "Crazy Chocolat – Guimauve & Chantilly", price: "3 500 Fr", image: imgChocolatCrazy },
];
const milkshakes = [
  { name: "Vanille", price: "2 000 Fr", image: imgMilkshakeVanille },
  { name: "Menthe", price: "2 000 Fr", image: imgMilkshakeMenthe },
  { name: "Fraise", price: "2 500 Fr", emoji: "🍓", image: imgMilkshakeFraise },
  { name: "Kinder Bueno", price: "2 500 Fr", image: imgMilkshakeKinder },
  { name: "Spéculoos Caramel Beurre Salé", price: "2 500 Fr", image: imgMilkshakeSpeculoos },
  { name: "Chocolat Oreo", price: "2 500 Fr", image: imgMilkshakeOreo },
  { name: "Coco Bounty", price: "2 500 Fr", image: imgMilkshakeCoco },
];
const jusNaturel = [
  { name: "Bissap", price: "1 000 Fr", image: imgJusBissap },
  { name: "Gingembre", price: "1 000 Fr", image: imgJusGingembre },
  { name: "Citron", price: "1 000 Fr", image: imgJusCitron },
  { name: "Sucrerie", price: "1 000 Fr", image: imgJusGingembre },
  { name: "Eau Minérale", price: "1 000 Fr", image: imgEauMinerale },
  { name: "Passion (selon saison)", price: "1 500 / 2 000 Fr", image: imgJusPassion },
  { name: "Cocktail de Fruits", price: "2 000 Fr", image: imgJusCocktail },
];
// Petit déjeuner - Déj Fermier
const dejFermier = [
  { name: "Café + Omelette", price: "1 500 Fr", image: imgPancakesNature },
  { name: "Café + Œuf au Plat", price: "1 500 Fr", image: imgPancakesNature },
  { name: "Café + Œuf au Plat (Jambon, Fromage)", price: "3 000 Fr", image: imgPancakesNature },
  { name: "Café + Omelette Farcie", price: "3 500 Fr", description: "Viande hachée, champignons, fromage", image: imgPancakesNature },
];
// Petit déjeuner - Crêpes salées
const crepesSalees = [
  { name: "Crêpe Fromage", price: "2 000 Fr", description: "Sauté de légumes", image: imgCrepeNature },
  { name: "Crêpe Jambon de Dinde", price: "2 500 Fr", description: "Fromage, légumes sautés", image: imgCrepeNature },
  { name: "Crêpe Viande Hachée", price: "3 000 Fr", description: "Fromage, champignons, légumes confits", image: imgCrepeNature },
  { name: "Crêpe Blanc de Poulet", price: "3 000 Fr", description: "Fromage, champignons, légumes confits", image: imgCrepeNature },
];
// Crêpes sucrées (petit déj)
const crepesSucrees = [
  { name: "Crêpe Nature (miel facultatif)", price: "1 000 Fr", image: imgCrepeNature },
  { name: "Crêpe Nutella", price: "1 500 Fr", image: imgCrepeNutella },
  { name: "Crêpe Fettuccine Nutella", price: "3 000 Fr", description: "Nutella, boule de glace, coulis de chocolat", image: imgCrepeFettNutella },
  { name: "Crêpe Fettuccine Oreo", price: "4 000 Fr", description: "Biscuits Oreo, boule de glace, coulis de chocolat", image: imgCrepeFettOreo },
  { name: "Crêpe Fettuccine Spéculoos", price: "4 000 Fr", description: "Biscuits spéculoos, boule de glace, coulis de chocolat", image: imgCrepeFettSpeculoos },
  { name: "Crêpe Fettuccine Fruits Saisonniers", price: "5 500 Fr", description: "Fruits de saison, granulats, boule de glace, coulis aux 3 chocolats", image: imgCrepeFettFruits },
  { name: "Crêpe Pralin", price: "6 000 Fr", description: "Crème pâtissière, fruits de saison, biscottes, boule de glace", image: imgCrepePralin },
];
// Desserts
const painsPerdu = [
  { name: "Pain Perdu Nature", price: "2 500 Fr", image: imgPainPerdu },
  { name: "Pain Perdu Caramel (boule de glace)", price: "4 000 Fr", image: imgPainPerduCaramel },
  { name: "Feuilleté de Pain Fourré", price: "6 000 Fr", description: "Crème pâtissière, boule de glace, fruits, spéculoos", image: imgFeuilletePain },
];
const pancakes = [
  { name: "Pancakes Nature", price: "1 000 Fr", image: imgPancakesNature },
  { name: "Pancakes Miel ou Caramel", price: "1 500 Fr", emoji: "🍯", image: imgPancakesCaramel },
  { name: "Pancakes Nutella", price: "2 000 Fr", image: imgPancakesNutella },
  { name: "Pancakes Caramel Fruit (saison)", price: "2 000 Fr", image: imgPancakesFruit },
];
const croissantGauffre = [
  { name: "Croissant Gauffre Vanille Spéculoos", price: "2 500 Fr", image: imgCroissantSpeculoos },
  { name: "Croissant Gauffre Oreo", price: "2 500 Fr", image: imgCroissantOreo },
  { name: "Croissant Gauffre Fruits Rouges", price: "3 000 Fr", image: imgCroissantFruits },
  { name: "Croissant Vanille Pistache", price: "2 500 Fr", image: imgCroissantPistache },
];
const crepes = [
  { name: "Crêpe Nature (miel facultatif)", price: "1 000 Fr", image: imgCrepeNature },
  { name: "Crêpe Nutella", price: "1 500 Fr", image: imgCrepeNutella },
  { name: "Crêpe Fettuccine Nutella", price: "3 000 Fr", description: "Nutella, boule de glace, coulis chocolat", image: imgCrepeFettNutella },
  { name: "Crêpe Fettuccine Oreo", price: "4 000 Fr", description: "Biscuits Oreo, boule de glace, coulis chocolat", image: imgCrepeFettOreo },
  { name: "Crêpe Fettuccine Spéculoos", price: "4 000 Fr", description: "Biscuits spéculoos, boule de glace, coulis chocolat", image: imgCrepeFettSpeculoos },
  { name: "Crêpe Fettuccine Fruits Saisonniers", price: "5 500 Fr", description: "Fruits, granulats, glace, coulis 3 chocolats", image: imgCrepeFettFruits },
  { name: "Crêpe Pralin", price: "6 000 Fr", description: "Crème pâtissière, fruits, biscottes, boule de glace", image: imgCrepePralin },
];
const degue = [
  { name: "Pain Fourré Lait Caillé", price: "1 500 Fr", image: imgPainLaitCaille },
  { name: "Pain Fourré Dêguê", price: "1 500 Fr", image: imgPainLaitCaille },
  { name: "Dêguê au Fruit de la Passion", price: "2 000 Fr", image: imgDegue },
  { name: "Dêguê au Lait de Coco", price: "2 000 Fr", image: imgDegue },
  { name: "Dêguê Café Cappuccino", price: "2 000 Fr", image: imgDegue },
  { name: "Dêguê Caramel Granola", price: "2 000 Fr", image: imgDegue },
];
const sauceFeuilleDej = [
  { name: "Sauce Feuille", price: "2 500 Fr", emoji: "🍚", description: "Viande de bœuf", image: imgSauceFeuille },
];
const pouletRoti = [
  { name: "1/4 Poulet Rôti", price: "2 500 Fr", description: "Pomme de terre sautées, salade 🥗", image: imgPouletRoti },
  { name: "1/2 Poulet Rôti", price: "4 000 Fr", description: "Pomme de terre sautées", image: imgPouletRoti },
  { name: "1 Poulet Entier", price: "8 000 Fr", image: imgPouletRoti },
];
const chawama = [
  { name: "Chawama Poulet", price: "2 000 Fr", image: imgChawama },
  { name: "Chawama Viande", price: "2 500 Fr", image: imgChawama },
];
const burgers = [
  { name: "Cheese Burger", price: "4 000 Fr", description: "1 steak, 1 œuf, oignon confit, 1 fromage, frites, cornichons, tomates, salade", image: imgBurger },
  { name: "Burger NERIYA", price: "8 000 Fr", description: "2 steaks, 3 fromages, 2 œufs, oignons confits, salade, tomates, cornichons, frites", image: imgBurger },
];
const tchep = [
  { name: "Tchêp Poulet", price: "2 000 / 2 500 Fr", image: imgTchepPoulet },
  { name: "Tchêp Poisson", price: "2 000 / 2 500 Fr", image: imgTchepPoisson },
  { name: "Tchêp Viande de Bœuf", price: "2 500 / 3 000 Fr", image: imgTchepBoeuf },
  { name: "Tchêp Mouton", price: "3 500 / 4 000 Fr", image: imgTchepMouton },
  { name: "Tchêp Boulette de Viande", price: "2 500 / 3 000 Fr", image: imgTchepBoulette },
];
const yassa = [
  { name: "Yassa Poulet Riz", price: "2 500 Fr", emoji: "🍚", image: imgYassaPoulet },
  { name: "Yassa Poulet Fonio", price: "3 000 / 3 500 Fr", image: imgYassaPoulet },
  { name: "Yassa Poisson Riz", price: "2 500 / 3 000 Fr", emoji: "🍚", image: imgYassaPoisson },
  { name: "Yassa Poisson Fonio", price: "3 000 / 3 500 Fr", image: imgYassaPoisson },
  { name: "Yassa Mouton Riz", price: "3 500 / 4 500 Fr", emoji: "🍚", image: imgYassaMouton },
  { name: "Yassa Mouton Fonio", price: "4 000 / 5 000 Fr", image: imgYassaMouton },
];
const mafe = [
  { name: "Pondeuse Fumée (riz / Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚", image: imgMafePondeuse },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr", image: imgMafePondeuse },
  { name: "1 Pondeuse Entière (riz ou Fonio)", price: "9 000 / 11 000 Fr", image: imgMafePondeuse },
  { name: "Poisson Fumé (riz ou Fonio)", price: "2 500 / 3 500 Fr", emoji: "🍚", image: imgMafePoisson },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr", image: imgMafeBoeuf },
];
const sauceTomate = [
  { name: "Sauce Tomate Boulette de Viande Riz", price: "2 500 Fr", emoji: "🍚", image: imgSauceTomate },
  { name: "Sauce Feuille de Viande de Bœuf Riz", price: "2 500 Fr", emoji: "🍚", image: imgSauceFeuille },
];
const sauceLegume = [
  { name: "Pondeuse Fumée (riz ou Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚", image: imgSauceLegume },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr", image: imgSauceLegume },
  { name: "1 Pondeuse Entière (riz / Fonio)", price: "9 000 / 11 000 Fr", image: imgSauceLegume },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr", image: imgMafeBoeuf },
];
const soupe = [
  { name: "½ Pondeuse (riz, attiéké)", price: "5 000 Fr", image: imgSoupePoulet },
  { name: "1 Pondeuse Entière (riz, attiéké)", price: "9 000 Fr", image: imgSoupePoulet },
  { name: "Soupe Poulet Chair ½ (attiéké, riz)", price: "3 500 Fr", image: imgSoupePoulet },
  { name: "Soupe Poulet Chair 1 entier (attiéké, riz)", price: "6 500 Fr", image: imgSoupePoulet },
  { name: "Soupe Poisson (riz, attiéké)", price: "3 000 / 4 000 / 5 000 Fr", description: "Prix selon le poisson du jour", image: imgSoupePoisson },
];

// ─── CATEGORIES ────────────────────────────────────────────
type CategoryKey = "petit-dejeuner" | "dejeuner" | "diner" | "dessert" | "boissons";

const categories: { key: CategoryKey; label: string; emoji: string; image: string; description: string }[] = [
  { key: "petit-dejeuner", label: "Petit Déjeuner", emoji: "🍳", image: catPetitDej, description: "Déj fermier, crêpes salées & sucrées" },
  { key: "dejeuner", label: "Déjeuner", emoji: "🍛", image: catDejeuner, description: "Tchêp, Yassa, Mafé, Sauces & Soupes" },
  { key: "diner", label: "Dîner", emoji: "🌙", image: catDiner, description: "Nos plats du soir" },
  { key: "dessert", label: "Desserts", emoji: "🍰", image: catDessert, description: "Pancakes, crêpes, gaufres & spécialités" },
  { key: "boissons", label: "Boissons", emoji: "☕", image: catBoissons, description: "Cafés, thés, chocolats, milkshakes & jus" },
];

// ─── CATEGORY CONTENT ─────────────────────────────────────
const CategoryContent = ({ category }: { category: CategoryKey }) => {
  switch (category) {
    case "petit-dejeuner":
      return (
        <div className="space-y-5">
          <MenuSection title="Déj Fermier 🍳" items={dejFermier} delay={0.1} backgroundImage={imgPancakesNature} imagePosition="right" />
          <MenuSection title="Crêpe Salée 🧂" items={crepesSalees} delay={0.15} backgroundImage={imgCrepeNature} imagePosition="left" />
          <MenuSection title="Crêpe Sucrée 🥞" items={crepesSucrees} delay={0.2} backgroundImage={imgCrepeFettNutella} imagePosition="right" />
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "dejeuner":
      return (
        <div className="space-y-5">
          <MenuSection title="Sauce Feuille 🍚" items={sauceFeuilleDej} delay={0.1} backgroundImage={imgSauceFeuille} imagePosition="right" />
          <MenuSection title="Poulet Rôti 🍗" items={pouletRoti} delay={0.15} backgroundImage={imgPouletRoti} imagePosition="left" />
          <MenuSection title="Chawama 🌯" items={chawama} delay={0.2} backgroundImage={imgChawama} imagePosition="right" />
          <MenuSection title="Burger 🍔" items={burgers} delay={0.25} backgroundImage={imgBurger} imagePosition="left" />
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "diner":
      return (
        <div className="space-y-5">
          <MenuSection title="Tchêp 🍛" items={tchep} delay={0.1} backgroundImage={imgTchepPoisson} imagePosition="right" />
          <MenuSection title="Yassa 🍗" items={yassa} delay={0.15} backgroundImage={imgYassaMouton} imagePosition="left" />
          <MenuSection title="Soupe 🍲" items={soupe} delay={0.2} backgroundImage={imgSoupePoisson} imagePosition="right" />
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "dessert":
      return (
        <div className="space-y-5">
          <MenuSection title="Pancakes 🥞" items={pancakes} delay={0.1} backgroundImage={imgPancakesFruit} imagePosition="right" />
          <MenuSection title="Pains Perdu 🍞" items={painsPerdu} delay={0.15} backgroundImage={imgPainPerduCaramel} imagePosition="left" />
          <MenuSection title="Croissant Gauffre 🧇" items={croissantGauffre} delay={0.2} backgroundImage={imgCroissantFruits} imagePosition="right" />
          <MenuSection title="Crêpes Sucrées 🥞" items={crepes} delay={0.25} backgroundImage={imgCrepePralin} imagePosition="left" />
          <MenuSection title="Dêguê & Lait Caillé 🥛" items={degue} delay={0.3} backgroundImage={imgDegue} imagePosition="right" />
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
    case "boissons":
      return (
        <div className="space-y-5">
          <div className="section-title-banner !mb-4 !bg-accent/10 !border-accent/30">
            <span className="font-display text-base font-bold uppercase tracking-widest text-accent">🔥 Boissons Chaudes</span>
          </div>
          <MenuSection title="Cafés ☕" items={cafeChaud} variant="hot" delay={0.1} backgroundImage={imgCappuccino} imagePosition="right" />
          <MenuSection title="Thés 🍵" items={theChaud} variant="hot" delay={0.15} backgroundImage={imgTheGingembreMenthe} imagePosition="left" />
          <MenuSection title="Chocolats 🍫" items={chocolatChaud} variant="hot" delay={0.2} backgroundImage={imgChocolatCrazy} imagePosition="right" />
          <div className="chalk-line my-4" />
          <div className="section-title-banner !mb-4 !bg-primary/5 !border-primary/30">
            <span className="font-display text-base font-bold uppercase tracking-widest text-primary">❄️ Boissons Froides</span>
          </div>
          <MenuSection title="Cafés Glacés ☕" items={cafeGlace} variant="cold" delay={0.25} backgroundImage={imgCafeGlace} imagePosition="left" />
          <MenuSection title="Thés Froids 🍵" items={theFroid} variant="cold" delay={0.3} backgroundImage={imgTheMojito} imagePosition="right" />
          <MenuSection title="Milkshakes 🥤" items={milkshakes} variant="cold" delay={0.35} backgroundImage={imgMilkshakeOreo} imagePosition="left" />
          <MenuSection title="Jus & Boissons 🧃" items={jusNaturel} delay={0.4} backgroundImage={imgJusCocktail} imagePosition="right" />
          <p className="bon-appetit text-3xl sm:text-4xl text-center pt-2">Bon Appétit !</p>
        </div>
      );
  }
};

// ─── DECORATIVE ORNAMENT ──────────────────────────────────
const GoldOrnament = () => (
  <div className="flex items-center justify-center gap-3 py-2">
    <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
    <Sparkles size={14} className="text-primary/50" />
    <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
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
            <div className="relative h-52 sm:h-72 overflow-hidden">
              <motion.img
                src={activeCat.image}
                alt={activeCat.label}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setActiveCategory(null)}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 glass-card text-foreground font-body text-sm px-4 py-2.5 rounded-full hover:bg-card/90 transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft size={16} />
                Retour
              </motion.button>
              
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="text-4xl sm:text-5xl block mb-2">{activeCat.emoji}</span>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-[0.15em] drop-shadow-lg">
                    {activeCat.label}
                  </h1>
                  <p className="font-body text-sm text-white/60 mt-2 tracking-wide">{activeCat.description}</p>
                </motion.div>
              </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 space-y-6 mt-4">
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
            <div className="relative h-[50vh] sm:h-[55vh] overflow-hidden grain-overlay">
              <motion.img
                src={heroImg}
                alt="Neriya — La bouchée gourmande"
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              <motion.div
                className="absolute bottom-8 sm:bottom-12 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
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

            <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-28 sm:pb-20 relative z-10">
              <div className="grid gap-4 sm:gap-5">
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    onClick={() => {
                      setActiveCategory(cat.key);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group relative overflow-hidden rounded-xl h-28 sm:h-32 text-left gold-glow shimmer-hover transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25 group-hover:from-black/70 transition-all duration-500" />

                    <div className="relative h-full flex items-center justify-between px-5 sm:px-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl sm:text-4xl drop-shadow-md">{cat.emoji}</span>
                          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider drop-shadow-sm">
                            {cat.label}
                          </h2>
                        </div>
                        <p className="font-body text-xs sm:text-sm text-white/55 ml-12 sm:ml-[3.25rem] tracking-wide">{cat.description}</p>
                      </div>
                      <ChevronRight size={24} className="text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </main>

            <footer className="relative border-t border-primary/10 py-10 px-4">
              <div className="max-w-md mx-auto text-center space-y-3">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
                  <img src={logo} alt="Neriya" className="h-10 w-10 rounded-full object-cover opacity-70" />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
                </div>
                <p className="font-script text-primary text-xl">Neriya</p>
                <p className="font-body text-xs text-muted-foreground italic tracking-wide">
                  Tous les prix sont en FCFA · Service compris
                </p>
                <p className="font-body text-[11px] text-muted-foreground/60">
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
