export const TRACKS = [
  'UI/UX Design',
  'Frontend Development',
  'Full Stack Development',
  'Back-End Development',
  'Data Science',
  'Embedded Systems',
  'Cyber Security',
  'Digital Marketing',
  'Business Analysis',
];

export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  price: number;
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
    description: 'A casual Egyptian restaurant with a wide variety of everyday dishes',
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
    description: 'American-style burgers and fries',
    color: 'bg-rose-950/60 border-rose-500/30',
    popular: ['AKM Burger', 'Crispy Chicken', 'Double Smash'],
    menu: [
      { id: 'akm-burger', name: 'AKM Burger', nameAr: 'برجر أكم', price: 85 },
      { id: 'crispy-chicken', name: 'Crispy Chicken', nameAr: 'فراخ مقرمشة', price: 75 },
      { id: 'double-smash', name: 'Double Smash', nameAr: 'دبل سماش', price: 110 },
    ],
  },
  {
    id: 'al-roken',
    name: 'Al-Roken Al-Demashqi',
    nameAr: 'الركن الدمشقي',
    emoji: '🧆',
    category: 'Syrian Cuisine',
    description: 'Authentic Syrian street food',
    color: 'bg-pink-950/60 border-pink-500/30',
    popular: ['Shawarma', 'Falafel Wrap', 'Hummus Plate'],
    menu: [
      { id: 'shawarma', name: 'Shawarma', nameAr: 'شاورما', price: 65 },
      { id: 'falafel-wrap', name: 'Falafel Wrap', nameAr: 'لفة فلافل', price: 45 },
      { id: 'hummus-plate', name: 'Hummus Plate', nameAr: 'طبق حمص', price: 55 },
    ],
  },
  {
    id: 'sushi-grill',
    name: 'Sushi & Grill',
    nameAr: 'سوشي وجريل',
    emoji: '🍱',
    category: 'Japanese Fusion',
    description: 'Sushi rolls and grilled specialties',
    color: 'bg-slate-900/80 border-slate-700/50',
    popular: ['California Roll', 'Grilled Salmon', 'Dragon Roll'],
    menu: [
      { id: 'california-roll', name: 'California Roll', nameAr: 'كاليفورنيا رول', price: 120 },
      { id: 'grilled-salmon', name: 'Grilled Salmon', nameAr: 'سلمون مشوي', price: 180 },
      { id: 'dragon-roll', name: 'Dragon Roll', nameAr: 'دراجون رول', price: 150 },
    ],
  },
  {
    id: 'esmo-a',
    name: 'Esmo A',
    nameAr: 'اسمه إيه',
    emoji: '🍲',
    category: 'Egyptian Home Cooking',
    description: 'Traditional Egyptian home-style meals',
    color: 'bg-emerald-950/60 border-emerald-500/30',
    popular: ['Koshary', 'Ful Medames', 'Molokhia'],
    menu: [
      { id: 'koshary', name: 'Koshary', nameAr: 'كشري', price: 45 },
      { id: 'ful-medames', name: 'Ful Medames', nameAr: 'فول مدمس', price: 35 },
      { id: 'molokhia', name: 'Molokhia', nameAr: 'ملوخية', price: 70 },
    ],
  },
  {
    id: 'havana',
    name: 'Havana',
    nameAr: 'هافانا',
    emoji: '🍕',
    category: 'Pizza & Italian',
    description: 'Wood-fired pizzas and Italian dishes',
    color: 'bg-blue-950/60 border-blue-500/30',
    popular: ['Margherita Pizza', 'Pepperoni Pizza', 'Pasta Carbonara'],
    menu: [
      { id: 'margherita-pizza', name: 'Margherita Pizza', nameAr: 'بيتزا مارجريتا', price: 95 },
      { id: 'pepperoni-pizza', name: 'Pepperoni Pizza', nameAr: 'بيتزا بيبروني', price: 115 },
      { id: 'pasta-carbonara', name: 'Pasta Carbonara', nameAr: 'باستا كاربونارا', price: 85 },
    ],
  },
  {
    id: 'gedo-abdo',
    name: 'Gedo Abdo',
    nameAr: 'جدو عبده',
    emoji: '🥙',
    category: 'Egyptian Sandwiches',
    description: 'Famous Egyptian sandwiches and wraps',
    color: 'bg-amber-950/60 border-amber-500/30',
    popular: ['Taameya Sandwich', 'Liver Sandwich', 'Kofta Sandwich'],
    menu: [
      { id: 'taameya-sandwich', name: 'Taameya Sandwich', nameAr: 'ساندويتش طعمية', price: 25 },
      { id: 'liver-sandwich', name: 'Liver Sandwich', nameAr: 'ساندويتش كبدة', price: 35 },
      { id: 'kofta-sandwich', name: 'Kofta Sandwich', nameAr: 'ساندويتش كفتة', price: 40 },
    ],
  },
  {
    id: 'gargabeta',
    name: 'Gargabeta',
    nameAr: 'جرجبيتا',
    emoji: '🥘',
    category: 'Egyptian Restaurant',
    description: 'A casual Egyptian restaurant with a wide variety of everyday dishes',
    color: 'bg-orange-950/60 border-orange-500/30',
    popular: ['Mixed Grill', 'Chicken Fiteer', 'Koshary'],
    menu: [],
  },
];
