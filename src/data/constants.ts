import { AL_ROKEN_MENU } from './menus/alRokenMenu';
import { SUSHI_GRILL_MENU } from './menus/sushiGrillMenu';
import { ESMO_A_MENU } from './menus/esmoAMenu';
import { GEDO_ABDO_MENU } from './menus/gedoAbdoMenu';
import { GARGABETA_MENU } from './menus/gargabetaMenu';
import { BATATES_KTEER_MENU } from './menus/batatesKteerMenu';
import { ASWAN_TRACKS } from './aswanTracks';

/** Active ICC tracks at ITI Aswan branch (see aswanTracks.ts). */
export const TRACKS = [...ASWAN_TRACKS];

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  section?: string;
  sectionAr?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  nameAr: string;
  emoji: string;
  category: string;
  description: string;
  color: string;
  popular: string[];
  menu: MenuItem[];
}

export function getRestaurantByName(name: string): Restaurant | undefined {
  return RESTAURANTS.find(r => r.name === name || r.nameAr === name);
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'al-winsh',
    name: 'Al-Winsh',
    nameAr: 'الونش',
    emoji: '🍽️',
    category: 'Egyptian Restaurant',
    description: 'Egyptian restaurant with a wide variety of everyday dishes',
    color: 'bg-red-950/60 border-red-500/30',
    popular: ['Meat Fiteer', 'Falafel Sandwich', 'Mixed Grill'],
    menu: [
      // Breakfast & Sandwiches
      { id: 'foul-simple', name: 'Foul (Simple)', nameAr: 'فول (سادة)', price: 10 },
      { id: 'foul-mixed', name: 'Foul (Mixed)', nameAr: 'فول (خلطة)', price: 10 },
      { id: 'foul-sauce', name: 'Foul (With Sauce)', nameAr: 'فول (صلصة)', price: 10 },
      { id: 'foul-sausage', name: 'Foul (Sausage)', nameAr: 'فول (سجق)', price: 20 },
      { id: 'foul-liver', name: 'Foul (Liver)', nameAr: 'فول (كبدة)', price: 20 },
      { id: 'falafel-simple', name: 'Falafel (Simple)', nameAr: 'فلافل (سادة)', price: 10 },
      { id: 'falafel-baba', name: 'Falafel (Baba)', nameAr: 'فلافل (بابا)', price: 12 },
      { id: 'falafel-iskandrani', name: 'Falafel (Iskandrani)', nameAr: 'فلافل (إسكندراني)', price: 12 },
      { id: 'falafel-mixed', name: 'Falafel (Mixed)', nameAr: 'فلافل (خلطة)', price: 12 },
      { id: 'falafel-egg', name: 'Falafel (Egg)', nameAr: 'فلافل (بيض مسلوق)', price: 15 },
      { id: 'falafel-cheese', name: 'Falafel (Cheese)', nameAr: 'فلافل (جبنة رومي)', price: 18 },
      
      // Potatoes & Eggs
      { id: 'fries-simple', name: 'Fries', nameAr: 'بوم فريت', price: 12 },
      { id: 'fries-meat', name: 'Fries (Ground Meat)', nameAr: 'بطاطس (لحمة مفرومة)', price: 25 },
      { id: 'fries-cheese', name: 'Fries (Cheese)', nameAr: 'بطاطس (رومي)', price: 17 },
      { id: 'egg-boiled', name: 'Boiled Eggs', nameAr: 'بيض (مسلوق)', price: 12 },
      { id: 'egg-omelette', name: 'Omelette', nameAr: 'بيض (أومليت)', price: 15 },
      { id: 'egg-shakshuka', name: 'Shakshuka', nameAr: 'بيض (شكشوكة)', price: 18 },
      { id: 'egg-pizza-sausage', name: 'Egg Pizza (Sausage)', nameAr: 'بيتزا بيض (سجق)', price: 35 },
      
      // Saaha & Mixed
      { id: 'saaha-sausage', name: 'Saaha (Sausage)', nameAr: 'ساحة (سجق)', price: 35 },
      { id: 'saaha-burger', name: 'Saaha (Burger)', nameAr: 'ساحة (برجر)', price: 35 },
      { id: 'liver-iskandrani', name: 'Liver (Iskandrani)', nameAr: 'كبدة إسكندراني', price: 30 },
      { id: 'dynamite', name: 'Dynamite', nameAr: 'ديناميت', price: 18 },
      
      // Pizza
      { id: 'pizza-margherita-s', name: 'Margherita (Small)', nameAr: 'مارجريتا (صغير)', price: 90 },
      { id: 'pizza-margherita-m', name: 'Margherita (Medium)', nameAr: 'مارجريتا (وسط)', price: 125 },
      { id: 'pizza-margherita-l', name: 'Margherita (Large)', nameAr: 'مارجريتا (كبير)', price: 150 },
      { id: 'pizza-meat-s', name: 'Pizza (Ground Meat, Small)', nameAr: 'بيتزا (لحمة مفرومة، صغير)', price: 110 },
      { id: 'pizza-meat-m', name: 'Pizza (Ground Meat, Medium)', nameAr: 'بيتزا (لحمة مفرومة، وسط)', price: 145 },
      { id: 'pizza-meat-l', name: 'Pizza (Ground Meat, Large)', nameAr: 'بيتزا (لحمة مفرومة، كبير)', price: 180 },
      { id: 'pizza-tuna-s', name: 'Pizza (Tuna, Small)', nameAr: 'بيتزا (تونا، صغير)', price: 120 },
      { id: 'pizza-tuna-m', name: 'Pizza (Tuna, Medium)', nameAr: 'بيتزا (تونا، وسط)', price: 170 },
      
      // Crepes
      { id: 'crepe-shawarma', name: 'Crepe (Shawarma)', nameAr: 'كريب (شاورما)', price: 120 },
      { id: 'crepe-zinger', name: 'Crepe (Zinger)', nameAr: 'كريب (زنجر)', price: 120 },
      { id: 'crepe-cheese', name: 'Crepe (Cheese)', nameAr: 'كريب (جبنة)', price: 85 },
      
      // Feteer (Pies)
      { id: 'feteer-meat-s', name: 'Feteer (Meat, Small)', nameAr: 'فطيرة (لحمة، صغير)', price: 100 },
      { id: 'feteer-meat-m', name: 'Feteer (Meat, Medium)', nameAr: 'فطيرة (لحمة، وسط)', price: 150 },
      { id: 'feteer-meat-l', name: 'Feteer (Meat, Large)', nameAr: 'فطيرة (لحمة، كبير)', price: 190 },
      { id: 'feteer-chicken-s', name: 'Feteer (Chicken, Small)', nameAr: 'فطيرة (فراخ، صغير)', price: 110 },
      { id: 'feteer-chicken-m', name: 'Feteer (Chicken, Medium)', nameAr: 'فطيرة (فراخ، وسط)', price: 160 },
      { id: 'pizza-east-s', name: 'Pizza Sharqi (Small)', nameAr: 'بيتزا شرقي (صغير)', price: 110 },
      { id: 'pizza-east-m', name: 'Pizza Sharqi (Medium)', nameAr: 'بيتزا شرقي (وسط)', price: 170 },
      
      // Pasta & Italian
      { id: 'pasta-red-sausage', name: 'Pasta (Red Sauce, Sausage)', nameAr: 'مكرونة (صوص أحمر، سجق)', price: 100 },
      { id: 'pasta-red-liver', name: 'Pasta (Red Sauce, Liver)', nameAr: 'مكرونة (صوص أحمر، كبدة)', price: 100 },
      { id: 'pasta-white-chicken', name: 'Pasta (White Sauce, Chicken)', nameAr: 'مكرونة (صوص أبيض، فراخ)', price: 120 },
      { id: 'hawashi-italian', name: 'Hawashi (Italian)', nameAr: 'حواوشي إيطالي', price: 100 },
      { id: 'lugmet-winsh', name: 'Lugmet Al-Winsh', nameAr: 'لقمة الونش', price: 110 },
      
      // Sweets
      { id: 'feteer-sugar', name: 'Feteer (Sugar)', nameAr: 'فطيرة سكر', price: 30 },
      { id: 'feteer-chocolate-s', name: 'Feteer (Chocolate, Small)', nameAr: 'فطيرة شيكولاتة (صغير)', price: 60 },
      { id: 'feteer-chocolate-l', name: 'Feteer (Chocolate, Large)', nameAr: 'فطيرة شيكولاتة (كبير)', price: 100 },
      { id: 'feteer-sweet-winsh-s', name: 'Sweet Feteer Winsh (Small)', nameAr: 'فطيرة حلو الونش (صغير)', price: 120 },
      { id: 'feteer-sweet-winsh-l', name: 'Sweet Feteer Winsh (Large)', nameAr: 'فطيرة حلو الونش (كبير)', price: 160 },
      
      // Sides & Drinks
      { id: 'fries-box', name: 'Fries Box', nameAr: 'باكت بطاطس', price: 25 },
      { id: 'sausage-box', name: 'Sausage Box', nameAr: 'علبة سجق', price: 60 },
      { id: 'pickles', name: 'Pickles', nameAr: 'طرشي', price: 5 },
      { id: 'salad', name: 'Fresh Salad', nameAr: 'سلطة خضراء', price: 8 },
    ],
  },
  {
    id: 'poshinki',
    name: 'Poshinki',
    nameAr: 'بوشنكي',
    emoji: '🍔',
    category: 'Burgers & Fast Food',
    description: 'Burgers and fries',
    color: 'bg-rose-950/60 border-rose-500/30',
    popular: ['AKM', 'M4', 'Poshinki', 'SCAR-L'],
    menu: [
      { id: 'hot-sauce', name: 'Hot Sauce', nameAr: 'صوص حار', price: 10 },
      { id: 'ranch-sauce', name: 'Ranch Sauce', nameAr: 'صوص رانش', price: 10 },
      { id: 'texas-sauce', name: 'Texas Sauce', nameAr: 'صوص تكساس', price: 20 },
      { id: 'cheddar-sauce', name: 'Cheddar Sauce', nameAr: 'صوص شيدر', price: 20 },
      {
        id: 'akm',
        name: 'AKM',
        nameAr: 'قطعة لحمة بلدي، خس، طماطم، خيار مخلل، روز بيف، بصل، صوص التكساس، صوص كاتشب + بطاطس',
        price: 120,
      },
      {
        id: 'm4',
        name: 'M4',
        nameAr: '٢ قطعة لحمة بلدي، خس، بصل، طماطم، خيار مخلل، روز بيف، صوص التكساس، صوص الكاتشب + بطاطس',
        price: 165,
      },
      {
        id: 'poshinki-burger',
        name: 'Poshinki',
        nameAr: 'قطعة لحمة بلدي، قطعتين فرايد تشكن، خس، طماطم، بصل، خيار مخلل، صوص تكساس، صوص شيدر، صوص رانش، روز بيف + بطاطس',
        price: 180,
      },
      {
        id: 'ump',
        name: 'UMP',
        nameAr: 'قطعة لحمة بلدي، شريحة جبنة مقلية، خس، طماطم، خيار مخلل، روز بيف، بصل، صوص التكساس، صوص الشيدر، صوص الكاتشب + بطاطس',
        price: 140,
      },
      {
        id: 'kar',
        name: 'KAR',
        nameAr: 'أربع قطع فرايد تشكن، خس، طماطم، خيار مخلل، تركي مدخن، بصل، صوص كاتشب، صوص رانش، صوص شيدر + بطاطس',
        price: 170,
      },
      {
        id: 'awm',
        name: 'AWM',
        nameAr: 'قطعتين فرايد تشكن، خس، طماطم، خيار مخلل، تركي مدخن، بصل، صوص كاتشب، صوص الرانش، صوص شيدر + بطاطس',
        price: 120,
      },
      {
        id: 'scar-l',
        name: 'SCAR-L',
        nameAr: '٦ قطع جمبري، صوص بوشنكي، خس، طماطم، بصل + بطاطس',
        price: 150,
      },
    ],
  },
  {
    id: 'al-roken',
    name: 'Al-Roken Al-Demashqi',
    nameAr: 'الركن الدمشقي',
    emoji: '🧆',
    category: 'Syrian Cuisine',
    description: 'Syrian pizza, shawarma, grills & mansaf',
    color: 'bg-pink-950/60 border-pink-500/30',
    popular: [
      'Meat Shawarma Syrian Bread (M)',
      'Chicken Shawarma Arabi Meal',
      'Al-Roken Pizza (M)',
      'Broasted Meal (4 pcs)',
    ],
    menu: AL_ROKEN_MENU,
  },
  {
    id: 'sushi-grill',
    name: 'Sushi and Grill',
    nameAr: 'سوشي اند جريل',
    emoji: '🍱',
    category: 'Varied Everyday Food',
    description: 'Sushi and burger restaurant',
    color: 'bg-slate-900/80 border-slate-700/50',
    popular: ['Dragon Roll', 'Philadelphia Roll', 'Spider Roll', 'Cheese Burger'],
    menu: SUSHI_GRILL_MENU,
  },
  {
    id: 'esmo-a',
    name: 'Esmoh A',
    nameAr: 'إسمه إيه',
    emoji: '🍕',
    category: 'Pizza & Feteer',
    description: 'Italian pizza, feteer, burgers & pasta',
    color: 'bg-emerald-950/60 border-emerald-500/30',
    popular: ['Meat Pizza (M)', 'Margherita Pizza (M)', 'Super Cheesy Burger', 'Negresco Pasta'],
    menu: ESMO_A_MENU,
  },
  {
    id: 'gedo-abdo',
    name: 'Gedo Abdo',
    nameAr: 'جدو عبدو',
    emoji: '🍕',
    category: 'Pizza & Alexandrian Pie',
    description: 'Pizza, pie, tasa & pasta',
    color: 'bg-amber-950/60 border-amber-500/30',
    popular: ['Gedo Abdo Special (M)', 'Sujuk Kiri Pie (M)', 'Mixed Meat Tasa', 'Nutella (L)'],
    menu: GEDO_ABDO_MENU,
  },
  {
    id: 'batates-kteer',
    name: 'Batates Kteer',
    nameAr: 'بطاطس كتير',
    emoji: '🍟',
    category: 'Fast Food',
    description: 'Syrian bread, French rolls & fries packets',
    color: 'bg-amber-950/60 border-amber-500/30',
    popular: ['Crispy', 'Zinger Mozzarella', 'Batates Kteer', 'Chicken Shawarma'],
    menu: BATATES_KTEER_MENU,
  },
  {
    id: 'gargabeta',
    name: 'Gargabeta',
    nameAr: 'جرجبيتا',
    emoji: '🍔',
    category: 'Burgers & Grills',
    description: 'Burgers, hawawshi, pasta, sandwiches & meals',
    color: 'bg-orange-950/60 border-orange-500/30',
    popular: ['Gargabeta Burger', 'Mood Box', 'Azouma Box', 'Kofta Meal'],
    menu: GARGABETA_MENU,
  },
];
