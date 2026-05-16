import type { MenuItem } from '../constants';

type Section = { section: string; sectionAr: string };

const SEC = {
  pizza: { section: 'Italian Pizza', sectionAr: '🍕 ركن البيتزا الإيطالي' },
  pizzaOffers: { section: 'Pizza Offers', sectionAr: '🎁 عروض البيتزا' },
  crepe: { section: 'Crepes', sectionAr: '🌮 ركن الكريبات' },
  grill: { section: 'Grills & Grill Sandwiches', sectionAr: '🥩 ركن المشويات' },
  pottery: { section: 'Pottery', sectionAr: '🏺 ركن الفخارة' },
  pasta: { section: 'Pasta', sectionAr: '🍝 ركن المكرونات' },
  hotApp: { section: 'Hot Appetizers', sectionAr: '🧆 مقبلات ساخنة' },
  coldApp: { section: 'Cold Appetizers & Salads', sectionAr: '🥗 مقبلات باردة' },
  soup: { section: 'Soup', sectionAr: '🍲 ركن الشوربة' },
  sides: { section: 'Sides', sectionAr: '🍟 ركن الأطباق' },
  manakish: { section: 'Manakish', sectionAr: '🥖 مناقيش' },
  kids: { section: 'Kids Meals', sectionAr: '👶 وجبات الأطفال' },
  shawarmaSand: { section: 'Shawarma Sandwiches', sectionAr: '🌯 ساندوتشات الشاورما' },
  shawarmaMeal: { section: 'Shawarma Meals', sectionAr: '🍽️ وجبات الشاورما' },
  shawarmaKilo: { section: 'Shawarma by Weight', sectionAr: '⚖️ شاورما بالكيلو' },
  shawarmaPie: { section: 'Shawarma Pie', sectionAr: '🥞 فطيرة الشاورما' },
  shawarmaFatteh: { section: 'Shawarma Fatteh', sectionAr: '🍚 فتات الشاورما' },
  broasted: { section: 'Broasted', sectionAr: '🍗 البروستد' },
  westernSand: { section: 'Western Sandwiches', sectionAr: '🥖 الساندوتشات الغربية' },
  westernMeal: { section: 'Western Meals', sectionAr: '🍟 الوجبات الغربية' },
  kudo: { section: 'Kudo Shawarma', sectionAr: '🥪 شاورما الكودو' },
  fattehPlate: { section: 'Fatteh Plates', sectionAr: '🍲 أطباق الفتة' },
  boxes: { section: 'Boxes', sectionAr: '📦 البوكسات' },
  chicken: { section: 'Chicken', sectionAr: '🍗 ركن الفراخ' },
  mansaf: { section: 'Mansaf', sectionAr: '👑 ركن المناسف' },
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

function ml(
  baseId: string,
  name: string,
  nameAr: string,
  priceM: number,
  priceL: number,
  sec: Section,
): MenuItem[] {
  return [
    item(`${baseId}-m`, `${name} (M)`, `${nameAr} — وسط`, priceM, sec),
    item(`${baseId}-l`, `${name} (L)`, `${nameAr} — كبير`, priceL, sec),
  ];
}

function weights(
  baseId: string,
  name: string,
  nameAr: string,
  quarter: number | null,
  half: number,
  kilo: number,
  sec: Section,
): MenuItem[] {
  const rows: MenuItem[] = [];
  if (quarter != null) {
    rows.push(item(`${baseId}-q`, `${name} (¼ kg)`, `${nameAr} — ربع كيلو`, quarter, sec));
  }
  rows.push(item(`${baseId}-h`, `${name} (½ kg)`, `${nameAr} — نص كيلو`, half, sec));
  rows.push(item(`${baseId}-k`, `${name} (1 kg)`, `${nameAr} — كيلو`, kilo, sec));
  return rows;
}

function sml(
  baseId: string,
  name: string,
  nameAr: string,
  small: number,
  medium: number,
  mix: number,
  sec: Section,
): MenuItem[] {
  return [
    item(`${baseId}-s`, `${name} (S)`, `${nameAr} — صغير`, small, sec),
    item(`${baseId}-m`, `${name} (M)`, `${nameAr} — وسط`, medium, sec),
    item(`${baseId}-x`, `${name} (Mix)`, `${nameAr} — مكس`, mix, sec),
  ];
}

const PIZZA: [string, string, number, number][] = [
  ['margherita', 'Margherita', 'مارجريتا', 175, 200],
  ['vegetables', 'Vegetables', 'خضار', 175, 200],
  ['mixed-cheese', 'Mixed Cheese', 'مشكل جبن', 185, 210],
  ['mushroom', 'Mushroom', 'مشروم', 185, 210],
  ['pastrami', 'Pastrami', 'بسطرمة', 205, 235],
  ['sausage-pizza', 'Sausage', 'سجق', 205, 235],
  ['meat-shawarma-pizza', 'Meat Shawarma', 'شاورما لحم', 215, 240],
  ['chicken-pizza', 'Chicken Pizza', 'بيتزا فراخ', 185, 215],
  ['chicken-shawarma-pizza', 'Chicken Shawarma', 'شاورما فراخ', 185, 215],
  ['bbq-chicken-pizza', 'BBQ Chicken', 'باربيكيو فراخ', 185, 215],
  ['super-crispy-pizza', 'Super Crispy', 'سوبر كرانشي', 185, 215],
  ['sosis-pizza', 'Sosis', 'سوسيس', 185, 215],
  ['tuna-pizza', 'Tuna', 'تونة', 185, 215],
  ['salami-pizza', 'Salami', 'سلامي', 190, 235],
  ['al-roken-pizza', 'Al-Roken Pizza', 'الركن الدمشقي', 215, 245],
];

export const AL_ROKEN_MENU: MenuItem[] = [
  item('pizza-crust-addon', 'Damascene Stuffed Crust Add-on', 'إضافة حشو أطراف دمشقي للبيتزا', 60, SEC.pizza),
  ...PIZZA.flatMap(([id, en, ar, m, l]) => ml(`pizza-${id}`, en, ar, m, l, SEC.pizza)),
  item('pizza-offer-2m', '2 Medium Pizzas (excl. Al-Roken)', 'عرض: أي 2 بيتزا وسط (ماعدا الركن)', 299, SEC.pizzaOffers),
  item('pizza-offer-2l', '2 Large Pizzas (excl. Al-Roken)', 'عرض: أي 2 بيتزا لارج (ماعدا الركن)', 369, SEC.pizzaOffers),

  item('crepe-crispy', 'Crispy Crepe', 'كريب كرسبي', 105, SEC.crepe),
  item('crepe-kofta', 'Kofta Crepe', 'كريب كفتة', 110, SEC.crepe),
  item('crepe-chicken-shawarma', 'Chicken Shawarma Crepe', 'كريب شاورما فراخ', 105, SEC.crepe),
  item('crepe-panee', 'Panee Crepe', 'كريب بانيه', 105, SEC.crepe),
  item('crepe-shish', 'Shish Crepe', 'كريب شيش فحم', 110, SEC.crepe),
  item('crepe-potato', 'Potato Crepe', 'كريب بطاطس', 90, SEC.crepe),
  item('crepe-fajita', 'Chicken Fajita Crepe', 'كريب فاهيتا فراخ', 105, SEC.crepe),
  item('crepe-sausage', 'Sausage Crepe', 'كريب سوسيس', 110, SEC.crepe),
  item('crepe-mixed-cheese', 'Mixed Cheese Crepe', 'كريب مكس جبن', 105, SEC.crepe),
  item('crepe-supreme', 'Supreme Crepe', 'كريب سوبريم', 115, SEC.crepe),
  item('crepe-burger', 'Burger Crepe', 'كريب برجر', 105, SEC.crepe),
  item('crepe-sujuk', 'Sujuk Crepe', 'كريب سجق', 110, SEC.crepe),
  item('crepe-al-roken', 'Al-Roken Crepe', 'كريب الركن', 115, SEC.crepe),

  ...weights('grill-kebab', 'Kebab', 'كباب', 285, 515, 935, SEC.grill),
  ...weights('grill-kofta-meat', 'Meat Kofta', 'كفتة لحم', 265, 470, 855, SEC.grill),
  ...weights('grill-kofta-chicken', 'Chicken Kofta', 'كفتة فراخ', 240, 405, 695, SEC.grill),
  ...weights('grill-shish-tawook', 'Shish Tawook', 'شيش طاووق', null, 410, 735, SEC.grill),
  ...weights('grill-mixed', 'Mixed Grill', 'مكس مشاوي', 285, 515, 855, SEC.grill),
  ...weights('grill-tarab', 'Tarab', 'طرب', 300, 520, 945, SEC.grill),
  item('grill-kofta-sandwich', 'Kofta on Coal Sandwich', 'كفتة على الفحم (ساندوتش)', 140, SEC.grill),
  item('grill-tarab-sandwich', 'Tarab Sandwich', 'طرب (ساندوتش)', 145, SEC.grill),
  item('grill-mandi-lamb', 'Mandi Lamb Order', 'طلب مندي لحم ضاني', 400, SEC.grill),

  item('pottery-shish', 'Pottery Shish', 'شيش فخارة', 199, SEC.pottery),
  item('pottery-sausage', 'Pottery Sausage', 'سجق فخارة', 199, SEC.pottery),
  item('pottery-fajita', 'Pottery Fajita', 'فاهيتا فخارة', 199, SEC.pottery),
  item('pottery-mexico', 'Pottery Mexico', 'مكسيكو فخارة', 199, SEC.pottery),

  ...ml('pasta-shawarma-chicken', 'Shawarma Chicken Béchamel Pasta', 'مكرونة بشاميل شاورما فراخ', 95, 155, SEC.pasta),
  ...ml('pasta-shawarma-meat', 'Shawarma Meat Béchamel Pasta', 'مكرونة بشاميل شاورما لحم', 100, 165, SEC.pasta),
  ...ml('pasta-negresco', 'Negresco Pasta', 'مكرونة بشاميل نجرسكو', 95, 155, SEC.pasta),
  ...ml('pasta-minced-meat', 'Minced Meat Béchamel Pasta', 'مكرونة بشاميل لحم مفروم', 100, 170, SEC.pasta),
  ...ml('pasta-white-red', 'White / Red Sauce Pasta', 'مكرونة وايت صوص / ريد صوص', 85, 145, SEC.pasta),

  item('app-kibbeh', 'Fried Kibbeh (3 pcs)', 'كبة مقلية (3 قطع)', 75, SEC.hotApp),
  item('app-sambousek-cheese', 'Cheese Sambousek (4 pcs)', 'سمبوسك بالجبنة (4 قطع)', 60, SEC.hotApp),
  item('app-sambousek-meat', 'Meat Sambousek (4 pcs)', 'سمبوسك لحم (4 قطع)', 70, SEC.hotApp),
  item('app-fried-cheese', 'Fried Cheese (3 pcs)', 'برك جبنة (3 قطع)', 75, SEC.hotApp),

  item('salad-caesar', 'Caesar Salad', 'سيزر سلاط', 85, SEC.coldApp),
  item('salad-fattoush', 'Fattoush Salad', 'سلطة فتوش', 75, SEC.coldApp),
  item('salad-tabouleh', 'Tabouleh Salad', 'سلطة تبولة', 65, SEC.coldApp),
  item('salad-green', 'Green Salad', 'سلطة خضراء', 60, SEC.coldApp),
  item('salad-coleslaw', 'Coleslaw', 'سلطة كولسلو', 45, SEC.coldApp),
  item('salad-mutabal', 'Mutabal', 'متبل', 60, SEC.coldApp),
  item('salad-baba-ghanoush', 'Baba Ghanoush', 'بابا غنوج', 60, SEC.coldApp),
  item('salad-toumeya', 'Toumeya (Regular / Spicy)', 'تومية (عادي / سبايسي)', 30, SEC.coldApp),
  item('salad-syrian-pickles', 'Syrian Pickles', 'مخلل سوري', 25, SEC.coldApp),
  item('salad-yalanji', 'Yalanji (Grape Leaves)', 'يالنجي (ورق عنب)', 65, SEC.coldApp),
  item('salad-tahini', 'Tahini', 'طحينة', 30, SEC.coldApp),

  item('soup-orzo', 'Orzo Soup', 'شوربة لسان عصفور', 60, SEC.soup),
  item('soup-lentil', 'Lentil Soup', 'شوربة عدس', 65, SEC.soup),

  item('side-boom-fries', 'Boom Fries', 'بطاطس بوم فريت', 50, SEC.sides),
  item('side-cheese-fries', 'Cheese Boom Fries', 'بطاطس بوم فريت جبنة شيدر وموزاريلا', 60, SEC.sides),
  item('side-rice', 'Rice Plate', 'طبق أرز', 50, SEC.sides),

  item('manakish-mixed-cheese', 'Mixed Cheese Manakish', 'مكس جبن', 80, SEC.manakish),
  item('manakish-shami', 'Shami Cheese', 'جبنة شامية', 65, SEC.manakish),
  item('manakish-mozzarella', 'Mozzarella', 'جبنة موزريلا', 65, SEC.manakish),
  item('manakish-halloumi', 'Halloumi', 'جبنة حلوم', 65, SEC.manakish),
  item('manakish-zatar', 'Zaatar', 'زعتر', 55, SEC.manakish),
  item('manakish-zatar-mozzarella', 'Zaatar Mozzarella', 'زعتر موزريلا', 65, SEC.manakish),
  item('manakish-muhammara', 'Muhammara', 'محمرة', 60, SEC.manakish),
  item('manakish-muhammara-mozzarella', 'Muhammara Mozzarella', 'محمرة موزريلا', 70, SEC.manakish),
  item('manakish-pastrami-mozzarella', 'Pastrami Mozzarella', 'بسطرمة موزريلا', 98, SEC.manakish),
  item('manakish-syrian-sausage-mozzarella', 'Syrian Sausage Mozzarella', 'سجق سوري موزريلا', 98, SEC.manakish),
  item('manakish-shish-tawook', 'Shish Tawook Manakish', 'شيش طاووق', 98, SEC.manakish),
  item('manakish-hawawshi-extra', 'Hawawshi Extra', 'حواوشي اكسترا', 155, SEC.manakish),
  item('manakish-sfiha', 'Sfiha', 'صفيحة', 90, SEC.manakish),
  item('manakish-mujarmasha', 'Mujarmasha', 'مجرمشة', 100, SEC.manakish),
  item('manakish-luncheon-mozzarella', 'Luncheon Mozzarella', 'لانشون موزريلا', 95, SEC.manakish),
  item('manakish-olives', 'Olives', 'زيتون', 60, SEC.manakish),

  item('kids-stress', 'Stress Kids Meal', 'ستريس (فينجر + بطاطس + مايونيز + عصير)', 160, SEC.kids),
  item('kids-popcorn-chicken', 'Popcorn Chicken Meal', 'وجبة بوب كورن دجاج', 160, SEC.kids),

  item('shaw-kizer-chicken', 'Chicken Shawarma Kaiser', 'شاورما كيزر فراخ', 70, SEC.shawarmaSand),
  item('shaw-kizer-meat', 'Meat Shawarma Kaiser', 'شاورما كيزر لحم', 85, SEC.shawarmaSand),
  ...ml('shaw-chicken-syrian', 'Chicken Shawarma Syrian Bread', 'شاورما فراخ عيش سوري', 85, 93, SEC.shawarmaSand),
  item('shaw-chicken-syrian-rocket', 'Chicken Shawarma Syrian Rocket', 'شاورما فراخ عيش سوري صاروخ', 100, SEC.shawarmaSand),
  item('shaw-chicken-french', 'Chicken Shawarma French Bread', 'شاورما فراخ عيش فرنساوي', 100, SEC.shawarmaSand),
  ...ml('shaw-meat-syrian', 'Meat Shawarma Syrian Bread', 'شاورما لحم عيش سوري', 100, 123, SEC.shawarmaSand),
  item('shaw-meat-syrian-rocket', 'Meat Shawarma Syrian Rocket', 'شاورما لحم عيش سوري صاروخ', 135, SEC.shawarmaSand),
  item('shaw-meat-french', 'Meat Shawarma French Bread', 'شاورما لحم عيش فرنساوي', 135, SEC.shawarmaSand),
  ...ml('shaw-mixed-syrian', 'Mixed Shawarma Syrian Bread', 'شاورما مكس عيش سوري', 100, 135, SEC.shawarmaSand),
  item('shaw-mixed-french', 'Mixed Shawarma French Bread', 'شاورما مكس عيش فرنساوي', 135, SEC.shawarmaSand),

  item('meal-shaw-chicken-arabi', 'Chicken Shawarma Arabi Meal', 'وجبة شاورما فراخ عربي', 150, SEC.shawarmaMeal),
  item('meal-shaw-chicken-mozzarella', 'Chicken Shawarma Mozzarella Meal', 'وجبة شاورما فراخ موزريلا', 165, SEC.shawarmaMeal),
  item('meal-shaw-chicken-double', 'Double Chicken Shawarma Meal', 'وجبة شاورما فراخ دوبل', 235, SEC.shawarmaMeal),
  item('meal-shaw-chicken-double-moz', 'Double Chicken Shawarma + Mozzarella', 'وجبة شاورما فراخ دوبل + موزريلا', 260, SEC.shawarmaMeal),
  item('meal-shaw-meat-arabi', 'Meat Shawarma Arabi Meal', 'وجبة شاورما لحم عربي', 185, SEC.shawarmaMeal),
  item('meal-shaw-meat-mozzarella', 'Meat Shawarma Mozzarella Meal', 'وجبة شاورما لحم موزريلا', 200, SEC.shawarmaMeal),
  item('meal-shaw-meat-double', 'Double Meat Shawarma Meal', 'وجبة شاورما لحم دوبل', 305, SEC.shawarmaMeal),
  item('meal-shaw-meat-double-moz', 'Double Meat Shawarma + Mozzarella', 'وجبة شاورما لحم دوبل + موزريلا', 330, SEC.shawarmaMeal),
  item('meal-shaw-mixed-arabi', 'Mixed Shawarma Arabi Meal', 'وجبة شاورما مكس عربي', 185, SEC.shawarmaMeal),
  item('meal-shaw-mixed-mozzarella', 'Mixed Shawarma Mozzarella Meal', 'وجبة شاورما مكس موزريلا', 205, SEC.shawarmaMeal),
  item('meal-shaw-mixed-double-moz', 'Double Mixed Shawarma + Mozzarella', 'وجبة شاورما مكس دوبل + موزريلا', 330, SEC.shawarmaMeal),

  ...weights('kilo-shaw-chicken', 'Chicken Shawarma', 'شاورما فراخ', 260, 435, 735, SEC.shawarmaKilo),
  ...weights('kilo-shaw-meat', 'Meat Shawarma', 'شاورما لحم', 385, 605, 990, SEC.shawarmaKilo),

  item('pie-shaw-chicken', 'Chicken Shawarma Pie', 'فطيرة شاورما فراخ', 150, SEC.shawarmaPie),
  item('pie-shaw-chicken-extra', 'Chicken Shawarma Pie Extra', 'فطيرة شاورما فراخ اكسترا', 165, SEC.shawarmaPie),
  item('pie-shaw-meat', 'Meat Shawarma Pie', 'فطيرة شاورما لحم', 170, SEC.shawarmaPie),
  item('pie-shaw-meat-extra', 'Meat Shawarma Pie Extra', 'فطيرة شاورما لحم اكسترا', 190, SEC.shawarmaPie),
  item('pie-mixed', 'Mixed Pie', 'فطيرة مكس', 170, SEC.shawarmaPie),
  item('pie-shaw-mixed', 'Mixed Shawarma Pie', 'فطيرة شاورما مكس', 190, SEC.shawarmaPie),

  ...sml('fatteh-shaw-chicken', 'Chicken Shawarma Fatteh', 'فتة شاورما فراخ', 90, 135, 149, SEC.shawarmaFatteh),
  ...sml('fatteh-shaw-chicken-moz', 'Chicken Shawarma Fatteh Mozzarella', 'فتة شاورما فراخ موزريلا', 105, 155, 169, SEC.shawarmaFatteh),
  ...sml('fatteh-shaw-meat', 'Meat Shawarma Fatteh', 'فتة شاورما لحم', 100, 163, 183, SEC.shawarmaFatteh),
  ...sml('fatteh-shaw-meat-moz', 'Meat Shawarma Fatteh Mozzarella', 'فتة شاورما لحم موزريلا', 115, 183, 203, SEC.shawarmaFatteh),
  ...sml('fatteh-shaw-mixed', 'Mixed Shawarma Fatteh', 'فتة شاورما مكس', 100, 163, 183, SEC.shawarmaFatteh),
  ...sml('fatteh-shaw-mixed-moz', 'Mixed Shawarma Fatteh Mozzarella', 'فتة شاورما مكس موزريلا', 115, 183, 200, SEC.shawarmaFatteh),

  item('broasted-2pc', 'Broasted Meal (2 pcs)', 'وجبة 2 قطعة بروستد', 168, SEC.broasted),
  item('broasted-4pc', 'Broasted Meal (4 pcs)', 'وجبة 4 قطعة بروستد', 290, SEC.broasted),
  item('broasted-8pc', 'Broasted Meal (8 pcs)', 'وجبة 8 قطعة بروستد', 500, SEC.broasted),
  item('broasted-12pc', 'Broasted Meal (12 pcs)', 'وجبة 12 قطعة بروستد', 705, SEC.broasted),

  item('sand-shish-tawook', 'Shish Tawook Sandwich', 'شيش طاووق', 130, SEC.westernSand),
  item('sand-crispy', 'Crispy Sandwich', 'كرسبي', 130, SEC.westernSand),
  item('sand-zinger', 'Zinger Sandwich', 'زنجر', 130, SEC.westernSand),
  item('sand-panee', 'Panee Sandwich', 'بانيه', 130, SEC.westernSand),
  item('sand-cordon-bleu', 'Cordon Bleu Sandwich', 'كوردن بلو', 140, SEC.westernSand),
  item('sand-mexico', 'Mexico Sandwich', 'مكسيكو', 133, SEC.westernSand),
  item('sand-francisco', 'Francisco Sandwich', 'فرانشيسكو', 133, SEC.westernSand),
  item('sand-chicken-burger', 'Chicken Burger', 'برجر فراخ', 130, SEC.westernSand),
  item('sand-meat-burger', 'Meat Burger', 'برجر لحم', 148, SEC.westernSand),
  item('sand-syrian-fries', 'Syrian Fries', 'بطاطس سوري', 70, SEC.westernSand),
  item('sand-mozzarella-fries', 'Mozzarella Fries', 'بطاطس موزريلا', 80, SEC.westernSand),

  ...ml('meal-crispy', 'Crispy Meal', 'وجبة كرسبي', 140, 199, SEC.westernMeal),
  ...ml('meal-zinger', 'Zinger Meal', 'وجبة زنجر', 140, 199, SEC.westernMeal),
  ...ml('meal-panee', 'Panee Meal', 'وجبة بانيه', 140, 199, SEC.westernMeal),
  item('meal-fajita', 'Fajita Meal (L)', 'وجبة فاهيتا — كبير', 203, SEC.westernMeal),
  item('meal-francisco', 'Francisco Meal (L)', 'وجبة فرانشيسكو — كبير', 203, SEC.westernMeal),
  item('meal-mexico', 'Mexico Meal (L)', 'وجبة مكسيكو — كبير', 203, SEC.westernMeal),
  item('meal-shish', 'Shish Meal (L)', 'وجبة شيش — كبير', 225, SEC.westernMeal),
  item('meal-supreme', 'Supreme Meal (L)', 'وجبة سوبريم — كبير', 240, SEC.westernMeal),
  item('meal-cordon-bleu', 'Cordon Bleu Meal (L)', 'وجبة كوردن بلو — كبير', 270, SEC.westernMeal),
  item('meal-single', 'Single (Crispy / Zinger / Panee)', 'سنجل (كرسبي أو زنجر أو بانيه)', 150, SEC.westernMeal),
  item('meal-double', 'Double Meal', 'دابل', 180, SEC.westernMeal),

  item('kudo-shaw-chicken', 'Chicken Shawarma Kudo', 'شاورما فراخ كودو', 150, SEC.kudo),
  item('kudo-shaw-chicken-extra', 'Chicken Shawarma Extra Kudo', 'شاورما فراخ اكسترا كودو', 170, SEC.kudo),
  item('kudo-shaw-meat', 'Meat Shawarma Kudo', 'شاورما لحم كودو', 175, SEC.kudo),
  item('kudo-shaw-meat-extra', 'Meat Shawarma Extra Kudo', 'شاورما لحم اكسترا كودو', 195, SEC.kudo),
  item('kudo-shaw-mixed', 'Mixed Shawarma Kudo', 'شاورما مكس كودو', 175, SEC.kudo),
  item('kudo-shaw-mixed-extra', 'Mixed Shawarma Extra Kudo', 'شاورما مكس اكسترا كودو', 195, SEC.kudo),

  ...ml('plate-fatteh-crispy', 'Crispy Fatteh Plate', 'طبق فتة كرسبي', 98, 158, SEC.fattehPlate),
  ...ml('plate-fatteh-zinger', 'Zinger Fatteh Plate', 'طبق فتة زنجر', 98, 158, SEC.fattehPlate),
  ...ml('plate-fatteh-fajita', 'Fajita Fatteh Plate', 'طبق فتة فاهيتا', 98, 158, SEC.fattehPlate),
  ...ml('plate-fatteh-mexico', 'Mexico Fatteh Plate', 'طبق فتة مكسيكو', 98, 158, SEC.fattehPlate),
  ...ml('plate-fatteh-francisco', 'Francisco Fatteh Plate', 'طبق فتة فرانشيسكو', 98, 158, SEC.fattehPlate),

  item('box-lamma', 'Lamma Box', 'بوكس اللمة', 340, SEC.boxes),
  item('box-omara', 'Omara Box', 'بوكس الأمراء', 295, SEC.boxes),
  item('box-ostora', 'Legend Box', 'بوكس الأسطورة', 325, SEC.boxes),
  item('box-fatteh-mix', 'Mixed Fatteh Box', 'بوكس مكسات الفتة', 415, SEC.boxes),
  item('box-al-roken', 'Al-Roken Box', 'بوكس الركن', 435, SEC.boxes),

  item('chicken-roast-half', 'Half Roast Chicken', 'نص فرخة شواية', 245, SEC.chicken),
  item('chicken-roast-full', 'Full Roast Chicken', 'فرخة شواية', 390, SEC.chicken),
  item('chicken-grill-half', 'Half Charcoal Chicken', 'نص فرخة مشوية على الفحم', 245, SEC.chicken),
  item('chicken-grill-full', 'Full Charcoal Chicken', 'فرخة مشوية على الفحم', 390, SEC.chicken),
  item('chicken-mandi-half', 'Half Mandi Chicken', 'نص فرخة مندي', 250, SEC.chicken),
  item('chicken-mandi-full', 'Full Mandi Chicken', 'فرخة مندي', 400, SEC.chicken),

  item('mansaf-al-roken', 'Al-Roken Mansaf', 'منسف الركن', 2225, SEC.mansaf),
  item('mansaf-akila', 'Akila Mansaf', 'منسف الأكيلة', 1325, SEC.mansaf),
  item('mansaf-rawaq', 'Rawaq Mansaf', 'منسف الرواق', 1025, SEC.mansaf),
  item('mansaf-shawarma', 'Shawarma Mansaf', 'منسف الشاورما', 510, SEC.mansaf),
  item('mansaf-mixed', 'Mixed Mansaf', 'منسف المكس', 525, SEC.mansaf),
];
