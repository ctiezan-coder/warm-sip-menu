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

// Category images
import catPetitDej from "@/assets/cat-petit-dejeuner.jpg";
import catDejeuner from "@/assets/cat-dejeuner.jpg";
import catDiner from "@/assets/cat-diner.jpg";
import catDessert from "@/assets/cat-dessert.jpg";
import catBoissons from "@/assets/cat-boissons.jpg";

// ─── TYPES ───────────────────────────────────────────────
export interface MenuItem {
  name: string;
  price: string;
  emoji?: string;
  description?: string;
  image?: string;
}

export type CategoryKey = "petit-dejeuner" | "dejeuner" | "diner" | "dessert" | "boissons";

export interface Category {
  key: CategoryKey;
  label: string;
  emoji: string;
  image: string;
  description: string;
}

// ─── CATEGORIES ──────────────────────────────────────────
export const categories: Category[] = [
  { key: "petit-dejeuner", label: "Petit Déjeuner", emoji: "🍳", image: catPetitDej, description: "Déj fermier, crêpes salées & sucrées" },
  { key: "dejeuner", label: "Déjeuner", emoji: "🍛", image: catDejeuner, description: "Tchêp, Yassa, Mafé, Sauces & Soupes" },
  { key: "diner", label: "Dîner", emoji: "🌙", image: catDiner, description: "Nos plats du soir" },
  { key: "dessert", label: "Desserts", emoji: "🍰", image: catDessert, description: "Pancakes, crêpes, gaufres & spécialités" },
  { key: "boissons", label: "Boissons", emoji: "☕", image: catBoissons, description: "Cafés, thés, chocolats, milkshakes & jus" },
];

// ─── BOISSONS ────────────────────────────────────────────
export const cafeChaud: MenuItem[] = [
  { name: "Expresso", price: "500 Fr", image: imgCafeExpresso },
  { name: "Double Expresso", price: "1 000 Fr", image: imgCafeExpresso },
  { name: "Americano", price: "1 000 Fr", image: imgCafeExpresso },
  { name: "Café Latté", price: "1 500 Fr", image: imgCafeLatte },
  { name: "Cappuccino", price: "1 500 Fr", image: imgCappuccino },
  { name: "Moca", price: "2 000 Fr", image: imgCafeMoca },
];
export const cafeGlace: MenuItem[] = [
  { name: "Americano", price: "2 000 Fr", image: imgCafeGlace },
  { name: "Café Latté", price: "2 500 Fr", image: imgCafeGlace },
  { name: "Caramel Expresso", price: "2 500 Fr", image: imgCafeGlace },
  { name: "Moca", price: "2 500 Fr", image: imgCafeMoca },
  { name: "Café Latté Caramel Spéculoos", price: "3 000 Fr", image: imgCafeCaramelSpeculoos },
];
export const theChaud: MenuItem[] = [
  { name: "Thé Lipton", price: "500 Fr", image: imgTheChaud },
  { name: "Thé Infusion Neriya", price: "1 000 Fr", image: imgTheChaud },
  { name: "Thé Infusion Gingembre Menthe", price: "1 500 Fr", image: imgTheGingembreMenthe },
];
export const theFroid: MenuItem[] = [
  { name: "Thé Mojito Citron", price: "1 500 Fr", emoji: "🍋", image: imgTheMojito },
  { name: "Thé Mojito Pêche", price: "1 500 Fr", emoji: "🍑", image: imgTheMojito },
  { name: "Thé Mojito Fraise", price: "1 500 Fr", emoji: "🍓", image: imgTheMojito },
  { name: "Thé Mojito Orange", price: "1 500 Fr", emoji: "🍊", image: imgTheMojito },
  { name: "Thé Fruit de la Passion Coco", price: "2 000 Fr", emoji: "🥥", image: imgJusPassion },
];
export const chocolatChaud: MenuItem[] = [
  { name: "Chocolat Chaud Classique", price: "2 000 Fr", image: imgChocolatChaud },
  { name: "Chocolat Chaud Chantilly", price: "2 500 Fr", image: imgChocolatChaud },
  { name: "Crazy Chocolat – Guimauve & Chantilly", price: "3 500 Fr", image: imgChocolatCrazy },
];
export const milkshakes: MenuItem[] = [
  { name: "Vanille", price: "2 000 Fr", image: imgMilkshakeVanille },
  { name: "Menthe", price: "2 000 Fr", image: imgMilkshakeMenthe },
  { name: "Fraise", price: "2 500 Fr", emoji: "🍓", image: imgMilkshakeFraise },
  { name: "Kinder Bueno", price: "2 500 Fr", image: imgMilkshakeKinder },
  { name: "Spéculoos Caramel Beurre Salé", price: "2 500 Fr", image: imgMilkshakeSpeculoos },
  { name: "Chocolat Oreo", price: "2 500 Fr", image: imgMilkshakeOreo },
  { name: "Coco Bounty", price: "2 500 Fr", image: imgMilkshakeCoco },
];
export const jusNaturel: MenuItem[] = [
  { name: "Bissap", price: "1 000 Fr", image: imgJusBissap },
  { name: "Gingembre", price: "1 000 Fr", image: imgJusGingembre },
  { name: "Citron", price: "1 000 Fr", image: imgJusCitron },
  { name: "Sucrerie", price: "1 000 Fr", image: imgJusGingembre },
  { name: "Eau Minérale", price: "1 000 Fr", image: imgEauMinerale },
  { name: "Passion (selon saison)", price: "1 500 / 2 000 Fr", image: imgJusPassion },
  { name: "Cocktail de Fruits", price: "2 000 Fr", image: imgJusCocktail },
];

// ─── PETIT DÉJEUNER ─────────────────────────────────────
export const dejFermier: MenuItem[] = [
  { name: "Café + Omelette", price: "1 500 Fr" },
  { name: "Café + Œuf au Plat", price: "1 500 Fr" },
  { name: "Café + Œuf au Plat (Jambon, Fromage)", price: "3 000 Fr" },
  { name: "Café + Omelette Farcie", price: "3 500 Fr", description: "Viande hachée, champignons, fromage" },
];
export const crepeSalee: MenuItem[] = [
  { name: "Crêpe Fromage", price: "2 000 Fr", description: "Sauté de légumes" },
  { name: "Crêpe Jambon de Dinde", price: "2 500 Fr", description: "Fromage, légumes sautés" },
  { name: "Crêpe Viande Hachée", price: "3 000 Fr", description: "Fromage, champignons, légumes confits" },
  { name: "Crêpe Blanc de Poulet", price: "3 000 Fr", description: "Fromage, champignons, légumes confits" },
];
export const crepeSucree: MenuItem[] = [
  { name: "Crêpe Nature", price: "1 000 Fr", description: "Miel facultatif", image: imgCrepeNature },
  { name: "Crêpe Nutella", price: "1 500 Fr", image: imgCrepeNutella },
  { name: "Crêpe Fettuccine Nutella", price: "3 000 Fr", description: "Nutella, boule de glace, coulis de chocolat", image: imgCrepeFettNutella },
  { name: "Crêpe Fettuccine Oreo", price: "4 000 Fr", description: "Biscuits Oreo, boule de glace, coulis de chocolat", image: imgCrepeFettOreo },
  { name: "Crêpe Fettuccine Spéculoos", price: "4 000 Fr", description: "Biscuits spéculoos, boule de glace, coulis de chocolat", image: imgCrepeFettSpeculoos },
  { name: "Crêpe Fettuccine Fruits Saisonniers", price: "5 500 Fr", description: "Fruits de saison, granulats, boule de glace, coulis 3 chocolats", image: imgCrepeFettFruits },
  { name: "Crêpe Pralin", price: "6 000 Fr", description: "Crème pâtissière, fruits de saison, biscottes, boule de glace", image: imgCrepePralin },
];

// ─── DESSERTS ────────────────────────────────────────────
export const painsPerdu: MenuItem[] = [
  { name: "Pain Perdu Nature", price: "2 500 Fr" },
  { name: "Pain Perdu Caramel (boule de glace)", price: "4 000 Fr" },
  { name: "Feuilleté de Pain Fourré", price: "6 000 Fr", description: "Crème pâtissière, boule de glace, fruits, spéculoos" },
];
export const pancakes: MenuItem[] = [
  { name: "Pancakes Nature", price: "1 000 Fr" },
  { name: "Pancakes Miel ou Caramel", price: "1 500 Fr", emoji: "🍯" },
  { name: "Pancakes Nutella", price: "2 000 Fr" },
  { name: "Pancakes Caramel Fruit (saison)", price: "2 000 Fr" },
];
export const croissantGauffre: MenuItem[] = [
  { name: "Croissant Gauffre Vanille Spéculoos", price: "2 500 Fr" },
  { name: "Croissant Gauffre Oreo", price: "2 500 Fr" },
  { name: "Croissant Gauffre Fruits Rouges", price: "3 000 Fr" },
  { name: "Croissant Vanille Pistache", price: "2 500 Fr" },
];
export const crepesDessert: MenuItem[] = [
  { name: "Crêpe Nature (miel facultatif)", price: "1 000 Fr" },
  { name: "Crêpe Nutella", price: "1 500 Fr" },
  { name: "Crêpe Fettuccine Nutella", price: "3 000 Fr", description: "Nutella, boule de glace, coulis chocolat" },
  { name: "Crêpe Fettuccine Oreo", price: "4 000 Fr", description: "Biscuits Oreo, boule de glace, coulis chocolat" },
  { name: "Crêpe Fettuccine Spéculoos", price: "4 000 Fr", description: "Biscuits spéculoos, boule de glace, coulis chocolat" },
  { name: "Crêpe Fettuccine Fruits Saisonniers", price: "5 500 Fr", description: "Fruits, granulats, glace, coulis 3 chocolats" },
  { name: "Crêpe Pralin", price: "6 000 Fr", description: "Crème pâtissière, fruits, biscottes, boule de glace" },
];
export const degue: MenuItem[] = [
  { name: "Pain Fourré Lait Caillé", price: "1 500 Fr" },
  { name: "Pain Fourré Dêguê", price: "1 500 Fr" },
  { name: "Dêguê au Fruit de la Passion", price: "2 000 Fr" },
  { name: "Dêguê au Lait de Coco", price: "2 000 Fr" },
  { name: "Dêguê Café Cappuccino", price: "2 000 Fr" },
  { name: "Dêguê Caramel Granola", price: "2 000 Fr" },
];

// ─── DÉJEUNER / DÎNER ───────────────────────────────────
export const tchep: MenuItem[] = [
  { name: "Tchêp Poulet", price: "2 000 / 2 500 Fr", image: imgTchepPoulet },
  { name: "Tchêp Poisson", price: "2 000 / 2 500 Fr", image: imgTchepPoisson },
  { name: "Tchêp Viande de Bœuf", price: "2 500 / 3 000 Fr", image: imgTchepBoeuf },
  { name: "Tchêp Mouton", price: "3 500 / 4 000 Fr", image: imgTchepMouton },
  { name: "Tchêp Boulette de Viande", price: "2 500 / 3 000 Fr", image: imgTchepBoulette },
];
export const yassa: MenuItem[] = [
  { name: "Yassa Poulet Riz", price: "2 500 Fr", emoji: "🍚", image: imgYassaPoulet },
  { name: "Yassa Poulet Fonio", price: "3 000 / 3 500 Fr", image: imgYassaPoulet },
  { name: "Yassa Poisson Riz", price: "2 500 / 3 000 Fr", emoji: "🍚", image: imgYassaPoisson },
  { name: "Yassa Poisson Fonio", price: "3 000 / 3 500 Fr", image: imgYassaPoisson },
  { name: "Yassa Mouton Riz", price: "3 500 / 4 500 Fr", emoji: "🍚", image: imgYassaMouton },
  { name: "Yassa Mouton Fonio", price: "4 000 / 5 000 Fr", image: imgYassaMouton },
];
export const mafe: MenuItem[] = [
  { name: "Pondeuse Fumée (riz / Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚", image: imgMafePondeuse },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr", image: imgMafePondeuse },
  { name: "1 Pondeuse Entière (riz ou Fonio)", price: "9 000 / 11 000 Fr", image: imgMafePondeuse },
  { name: "Poisson Fumé (riz ou Fonio)", price: "2 500 / 3 500 Fr", emoji: "🍚", image: imgMafePoisson },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr", image: imgMafeBoeuf },
];
export const sauceTomate: MenuItem[] = [
  { name: "Sauce Tomate Boulette de Viande Riz", price: "2 500 Fr", emoji: "🍚", image: imgSauceTomate },
  { name: "Sauce Feuille de Viande de Bœuf Riz", price: "2 500 Fr", emoji: "🍚", image: imgSauceFeuille },
];
export const sauceLegume: MenuItem[] = [
  { name: "Pondeuse Fumée (riz ou Fonio)", price: "3 000 / 3 500 Fr", emoji: "🍚", image: imgSauceLegume },
  { name: "½ Pondeuse Fumée (riz ou Fonio)", price: "4 500 / 6 000 Fr", image: imgSauceLegume },
  { name: "1 Pondeuse Entière (riz / Fonio)", price: "9 000 / 11 000 Fr", image: imgSauceLegume },
  { name: "Viande de Bœuf Fumée (riz / Fonio)", price: "2 500 / 3 500 Fr", image: imgMafeBoeuf },
];
export const soupe: MenuItem[] = [
  { name: "½ Pondeuse (riz, attiéké)", price: "5 000 Fr", image: imgSoupePoulet },
  { name: "1 Pondeuse Entière (riz, attiéké)", price: "9 000 Fr", image: imgSoupePoulet },
  { name: "Soupe Poulet Chair ½ (attiéké, riz)", price: "3 500 Fr", image: imgSoupePoulet },
  { name: "Soupe Poulet Chair 1 entier (attiéké, riz)", price: "6 500 Fr", image: imgSoupePoulet },
  { name: "Soupe Poisson (riz, attiéké)", price: "3 000 / 4 000 / 5 000 Fr", description: "Prix selon le poisson du jour", image: imgSoupePoisson },
];
