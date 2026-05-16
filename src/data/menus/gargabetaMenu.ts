import type { MenuItem } from '../constants';

type Section = { section: string; sectionAr: string };

const SEC = {
  burger: { section: 'Burgers', sectionAr: '🍔 ركن البرجر' },
  hawawshi: { section: 'Hawawshi', sectionAr: '🌯 ركن الحواوشي' },
  pasta: { section: 'Pasta', sectionAr: '🍝 ركن المكرونة' },
  sandwiches: { section: 'Sandwiches', sectionAr: '🥪 ركن السندوتشات' },
  meals: { section: 'Meals & Meat Sheets', sectionAr: '🍱 ركن الوجبات ورقة اللحمة' },
  boxes: { section: 'Boxes', sectionAr: '📦 ركن البوكسات' },
  addons: { section: 'Add-ons', sectionAr: '🍟 ركن الإضافات' },
} as const satisfies Record<string, Section>;

function item(
  id: string,
  name: string,
  nameAr: string,
  price: number,
  sec: Section,
): MenuItem {
  return { id, name, nameAr, price, ...sec };
}

type PastaRow = [string, string, string, number, number, number];

function pastaVariants(
  baseId: string,
  name: string,
  nameAr: string,
  plain: number,
  mozzarella: number,
  pastrami: number,
): MenuItem[] {
  return [
    item(`${baseId}-plain`, `${name} (Plain)`, `${nameAr} — سادة`, plain, SEC.pasta),
    item(`${baseId}-mozzarella`, `${name} (Mozzarella)`, `${nameAr} — موزاريلا`, mozzarella, SEC.pasta),
    item(`${baseId}-pastrami`, `${name} (Pastrami)`, `${nameAr} — بسطرمة`, pastrami, SEC.pasta),
  ];
}

const PASTA: PastaRow[] = [
  ['pasta-meatballs', 'Meatballs Pasta', 'مكرونة كرات لحم', 80, 95, 95],
  ['pasta-chicken-balls', 'Chicken Balls Pasta', 'مكرونة كرات فراخ', 75, 90, 90],
  ['pasta-minced-meat', 'Minced Meat Pasta', 'مكرونة لحم مفروم', 70, 85, 85],
  ['pasta-sausage', 'Sausage Pasta', 'مكرونة سجق', 70, 85, 85],
  ['pasta-stress', 'Stress Pasta', 'مكرونة ستريس', 75, 90, 90],
  ['pasta-sauce', 'Sauce Pasta', 'مكرونة صلصة', 45, 60, 60],
];

export const GARGABETA_MENU: MenuItem[] = [
  item('burger-classic', 'Classic Burger', 'برجر كلاسيك', 115, SEC.burger),
  item('burger-classic-double', 'Classic Burger Double', 'برجر كلاسيك دابل', 175, SEC.burger),
  item('burger-cheese', 'Cheese Burger', 'برجر تشيز', 130, SEC.burger),
  item('burger-cheese-double', 'Cheese Burger Double', 'برجر تشيز دابل', 185, SEC.burger),
  item('burger-fried-chicken', 'Fried Chicken Burger', 'برجر فرايد تشيكن', 130, SEC.burger),
  item('burger-fried-chicken-double', 'Fried Chicken Burger Double', 'برجر فرايد تشيكن دابل', 195, SEC.burger),
  item('burger-gargabeta', 'Gargabeta Burger', 'برجر جرجبيتا', 130, SEC.burger),
  item('burger-gargabeta-double', 'Gargabeta Burger Double', 'برجر جرجبيتا دابل', 185, SEC.burger),
  item('burger-pineapple', 'Pineapple Burger', 'برجر أناناس', 140, SEC.burger),
  item('burger-pineapple-double', 'Pineapple Burger Double', 'برجر أناناس دابل', 190, SEC.burger),

  item('hawawshi-meat', 'Meat Hawawshi', 'حواوشي لحمة', 55, SEC.hawawshi),
  item('hawawshi-pastrami', 'Pastrami Hawawshi', 'حواوشي بسطرمة', 70, SEC.hawawshi),
  item('hawawshi-sujuk', 'Sujuk Hawawshi', 'حواوشي سجق', 65, SEC.hawawshi),
  item('hawawshi-cheddar', 'Cheddar Hawawshi', 'حواوشي شيدر', 65, SEC.hawawshi),
  item('hawawshi-mozzarella', 'Mozzarella Hawawshi', 'حواوشي موزاريلا', 65, SEC.hawawshi),
  item('hawawshi-salami', 'Salami Hawawshi', 'حواوشي سلامي', 65, SEC.hawawshi),
  item('hawawshi-ranch', 'Ranch Hawawshi', 'حواوشي بصوص الرانش', 65, SEC.hawawshi),
  item('hawawshi-smoked-romi', 'Smoked Romi Hawawshi', 'حواوشي رومي مدخن', 75, SEC.hawawshi),
  item('hawawshi-smoked-meat', 'Smoked Meat Hawawshi', 'حواوشي لحم مدخن', 85, SEC.hawawshi),
  item('hawawshi-tarab', 'Tarab Hawawshi (NEW)', 'حواوشي طرب', 80, SEC.hawawshi),

  ...PASTA.flatMap(([id, en, ar, p, m, pa]) => pastaVariants(id, en, ar, p, m, pa)),

  item('sand-kofta-hati', 'Hati Kofta', 'كفتة حاتي', 70, SEC.sandwiches),
  item('sand-kofta-double', 'Double Kofta', 'كفتة دوبل', 110, SEC.sandwiches),
  item('sand-kebab-fillet', 'Kebab Fillet', 'كباب فلتو', 95, SEC.sandwiches),
  item('sand-tarab', 'Tarab (White Chocolate)', 'طرب (وايت شوكليت)', 85, SEC.sandwiches),
  item('sand-baladi-sujuk', 'Baladi Sujuk', 'سجق بلدي', 70, SEC.sandwiches),
  item('sand-chicken-kofta', 'Chicken Kofta', 'كفتة فراخ', 65, SEC.sandwiches),
  item('sand-shish-tawook', 'Shish Tawook', 'شيش طاووق', 70, SEC.sandwiches),
  item('sand-shish-cheddar', 'Shish Tawook Cheddar', 'شيش طاووق شيدر', 80, SEC.sandwiches),
  item('sand-shish-ranch', 'Shish Tawook Ranch', 'شيش طاووق رانش', 80, SEC.sandwiches),
  item('sand-tika-spicy', 'Spicy Tika', 'شيش تكا حار', 70, SEC.sandwiches),
  item('sand-tika-cheddar', 'Tika Cheddar', 'شيش تكا شيدر', 80, SEC.sandwiches),
  item('sand-tika-ranch', 'Tika Ranch', 'شيش تكا رانش', 80, SEC.sandwiches),
  item('sand-liver-grill', 'Grilled Liver (Dark Chocolate)', 'كبدة مشوية (دارك شوكليت)', 70, SEC.sandwiches),
  item('sand-crispy', 'Crispy', 'كرسبي', 90, SEC.sandwiches),
  item('sand-crispy-zinger', 'Hot Zinger Crispy', 'كرسبي زنجر حار', 100, SEC.sandwiches),
  item('sand-liver-panee', 'Liver Panee', 'كبدة بانيه', 65, SEC.sandwiches),
  item('sand-steak', 'Steak', 'استيك', 90, SEC.sandwiches),
  item('sand-kaware', 'Kaware', 'كوارع', 65, SEC.sandwiches),
  item('sand-kaware-sujuk', 'Kaware + Sujuk', 'كوارع + سجق', 80, SEC.sandwiches),
  item('sand-pineapple-kofta', 'Pineapple Kofta', 'كفتة اناناس', 90, SEC.sandwiches),
  item('sand-mixed-kofta', 'Mixed Kofta', 'كفتة مكسات', 90, SEC.sandwiches),

  item('meal-kofta', 'Kofta Meal', 'وجبة كفتة', 165, SEC.meals),
  item('meal-sujuk', 'Sujuk Meal', 'وجبة سجق', 180, SEC.meals),
  item('meal-kofta-tarab', 'Kofta + Tarab Meal', 'وجبة كفتة + طرب', 195, SEC.meals),
  item('meal-tarab', 'Tarab Meal', 'وجبة طرب', 220, SEC.meals),
  item('meal-mixed-kofta-tarab-sujuk', 'Mixed Meal (Kofta + Tarab + Sujuk)', 'وجبة مكس (كفتة + طرب + سجق)', 200, SEC.meals),
  item('meal-kebab-kofta', 'Kebab & Kofta Meal', 'وجبة كباب وكفتة (2 كفتة + 1 كباب)', 240, SEC.meals),
  item('meal-grilled-liver', 'Grilled Liver Meal', 'وجبة كبدة مشوية', 165, SEC.meals),
  item('meal-chicken-sujuk', 'Chicken + Sujuk Meal', 'وجبة فراخ + سجق', 175, SEC.meals),
  item('meal-chicken-kofta', 'Chicken + Kofta Meal', 'وجبة فراخ + كفتة (3 فراخ + 2 كفتة)', 175, SEC.meals),
  item('meal-chicken-kofta-tarab', 'Chicken + Kofta + Tarab Meal', 'وجبة فراخ + كفتة + طرب', 245, SEC.meals),
  item('meal-chicken-tarab-sujuk', 'Chicken + Tarab + Sujuk Meal', 'وجبة فراخ + طرب + سجق', 245, SEC.meals),
  item('meal-chicken-kofta-only', 'Chicken Kofta Meal', 'وجبة كفتة فراخ', 150, SEC.meals),
  item('meal-shish-tawook', 'Shish Tawook Meal', 'وجبة شيش طاووق', 175, SEC.meals),
  item('meal-spicy-tika', 'Spicy Tika Meal', 'وجبة شيش تكا حار', 175, SEC.meals),
  item('meal-quarter-chicken', 'Quarter Chicken Meal', 'وجبة ربع فراخ', 100, SEC.meals),
  item('meal-quarter-chicken-breast', 'Quarter Chicken Breast Meal', 'وجبة ربع فراخ صدر', 110, SEC.meals),
  item('meal-half-chicken', 'Half Chicken Meal', 'وجبة نص فراخ', 180, SEC.meals),
  item('meal-crispy-rice', 'Crispy Rice Meal (4 pcs)', 'وجبة كرسبي ارز (4 قطع)', 210, SEC.meals),
  item('meal-crispy-fries', 'Crispy Fries Meal (4 pcs)', 'وجبة كرسبي بطاطس (4 قطع)', 185, SEC.meals),
  item('sheet-meat', 'Meat Sheet', 'ورقة لحمة', 280, SEC.meals),
  item('sheet-steak', 'Steak Sheet', 'ورقة ستيك', 280, SEC.meals),
  item('sheet-sujuk', 'Sujuk Sheet', 'ورقة سجق', 230, SEC.meals),
  item('sheet-mixed-meat-sujuk', 'Mixed Sheet (Meat + Sujuk)', 'ورقة مكس (لحمة + سجق)', 280, SEC.meals),
  item('meal-chicken-kofta-sujuk', 'Chicken + Kofta + Sujuk Meal', 'وجبة فراخ + كفتة + سجق', 240, SEC.meals),
  item('meal-meat-chicken-kofta', 'Meat Kofta + Chicken Kofta Meal', 'وجبة كفتة لحمة + كفتة فراخ', 175, SEC.meals),
  item('meal-kebab-batlo', 'Kebab Batlo Meal', 'وجبة كباب بتلو', 250, SEC.meals),

  item(
    'box-mood',
    'Mood Box',
    'بوكس المزاج — 2 حواوشي + 1 كفتة + 1 سجق + 1 شيش تكا',
    295,
    SEC.boxes,
  ),
  item(
    'box-wad-ami',
    'Wad Ami Box',
    'بوكس واد عمي — 2 كفتة + 2 شيش + 2 حواوشي',
    370,
    SEC.boxes,
  ),
  item(
    'box-azouma',
    'Azouma Box',
    'بوكس العزومة — 2 سجق + 1 طرب + 1 كبدة + 1 كفتة + 1 شيش + 1 حواوشي',
    450,
    SEC.boxes,
  ),

  item('add-tahini-tomato', 'Tahini / Pickled Tomato', 'طحينة / طماطم متبلة', 15, SEC.addons),
  item('add-pickles-salad', 'Pickles / Water Salad', 'مخلل / ماء سلطة', 10, SEC.addons),
  item('add-cheese-toppings', 'Mozzarella / Pastrami / Cheddar', 'موتزاريلا / بسطرمة / جبنة شيدر', 20, SEC.addons),
  item('add-rice-box', 'Rice Box', 'علبة ارز', 40, SEC.addons),
  item('add-fries-pack', 'Fries Pack', 'باكت بطاطس', 30, SEC.addons),
  item('add-cheese-fries-pack', 'Cheddar / Mozzarella Fries Pack', 'باكت بطاطس شيدر / موزتزاريلا', 50, SEC.addons),
  item('add-sauce-cup', 'Ranch / Cheddar / Big Tasty Cup', 'كاب صوص رانش / شيدر / بيج تيستي', 25, SEC.addons),
];
