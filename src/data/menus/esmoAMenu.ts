import type { MenuItem } from '../constants';

type Section = { section: string; sectionAr: string };

const SEC = {
  pizzaMeat: { section: 'Pizza — Meat Lovers', sectionAr: '🥩 عشاق اللحوم' },
  pizzaCheese: { section: 'Pizza — Cheese Lovers', sectionAr: '🧀 عشاق الجبن والخضروات' },
  pizzaChicken: { section: 'Pizza — Chicken Lovers', sectionAr: '🍗 عشاق الفراخ' },
  pizzaFasting: { section: 'Fasting Pizza', sectionAr: '🥦 البيتزا الإيطالية الصيامي' },
  pizzaCustom: { section: 'Build Your Pizza', sectionAr: '🍕 بيتزا خاصة' },
  pizzaSpecial: { section: 'Special Stuffed Pizza', sectionAr: '🍕 عروض بيتزا الحشو الخاص' },
  pizzaOther: { section: 'Special Pizzas', sectionAr: '🍕 بيتزا مميزة' },
  feteerSavory: { section: 'Savory Feteer', sectionAr: '🧀 الفطائر المالحة' },
  pizzaEastern: { section: 'Eastern Pizza', sectionAr: '🍕 البيتزا الشرقية' },
  feteerMeshaltet: { section: 'Meshaltet', sectionAr: '🥞 المشلتت' },
  feteerSweet: { section: 'Sweet Feteer', sectionAr: '🍯 فطائر الحلو' },
  feteerSweetAddons: { section: 'Sweet Feteer Add-ons', sectionAr: '🍧 إضافات فطائر الحلو' },
  sandwiches: { section: 'Quick Sandwiches', sectionAr: '🥖 السندوتشات السريعة' },
  burgers: { section: 'Burgers', sectionAr: '🍔 سندوتشات البرجر' },
  arabicSandwich: { section: 'Arabic Bread Sandwich', sectionAr: '🌯 ساندوتش الخبز العربي' },
  corndog: { section: 'Corndog', sectionAr: '🌭 كورت دوج' },
  pasta: { section: 'Pasta', sectionAr: '🍝 المكرونة والباستا' },
  sides: { section: 'Sides & Extras', sectionAr: '🍟 الإضافات والمنكهات' },
  sauces: { section: 'Sauces', sectionAr: '🍯 إضافة الصوصات' },
  drinks: { section: 'Drinks', sectionAr: '🥤 المشروبات' },
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

function s4(
  baseId: string,
  name: string,
  nameAr: string,
  prices: [number, number, number, number],
  sec: Section,
): MenuItem[] {
  const [s, m, l, f] = prices;
  return [
    item(`${baseId}-s`, `${name} (S)`, `${nameAr} — صغير`, s, sec),
    item(`${baseId}-m`, `${name} (M)`, `${nameAr} — وسط`, m, sec),
    item(`${baseId}-l`, `${name} (L)`, `${nameAr} — كبير`, l, sec),
    item(`${baseId}-f`, `${name} (Family)`, `${nameAr} — عائلي`, f, sec),
  ];
}

function s3(
  baseId: string,
  name: string,
  nameAr: string,
  prices: [number, number, number],
  sec: Section,
): MenuItem[] {
  const [s, m, l] = prices;
  return [
    item(`${baseId}-s`, `${name} (S)`, `${nameAr} — صغير`, s, sec),
    item(`${baseId}-m`, `${name} (M)`, `${nameAr} — وسط`, m, sec),
    item(`${baseId}-l`, `${name} (L)`, `${nameAr} — كبير`, l, sec),
  ];
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

type Row4 = [string, string, string, [number, number, number, number]];
type Row3 = [string, string, string, [number, number, number]];

function from4(rows: Row4[], sec: Section): MenuItem[] {
  return rows.flatMap(([id, en, ar, p]) => s4(id, en, ar, p, sec));
}

function from3(rows: Row3[], sec: Section): MenuItem[] {
  return rows.flatMap(([id, en, ar, p]) => s3(id, en, ar, p, sec));
}

const PIZZA_MEAT: Row4[] = [
  ['pizza-meat', 'Meat Pizza', 'بيتزا لحمة', [110, 160, 210, 255]],
  ['pizza-pepperoni', 'Pepperoni Pizza', 'بيتزا الببيرونى', [125, 170, 220, 270]],
  ['pizza-roast-beef', 'Roast Beef Pizza', 'بيتزا روزبيف', [125, 170, 220, 270]],
  ['pizza-burger-king', 'Burger King Pizza', 'بيتزا برجركنج', [110, 165, 215, 260]],
  ['pizza-liver', 'Liver Pizza', 'بيتزا كبداكى', [110, 160, 210, 255]],
  ['pizza-hot-dog', 'Hot Dog Pizza', 'بيتزا هوت دوج', [110, 160, 210, 255]],
  ['pizza-moka', 'Moka Pizza', 'بيتزا موكا', [110, 165, 215, 260]],
  ['pizza-pastrami', 'Pastrami Pizza', 'بيتزا بسطرمة', [145, 180, 230, 280]],
  ['pizza-hooper', 'Hooper Pizza', 'بيتزا هوبر', [110, 165, 220, 270]],
  ['pizza-mixed-meat', 'Mixed Meat Pizza', 'بيتزا ميكس لحوم', [140, 175, 225, 275]],
  ['pizza-mixed-meat-2', 'Mixed Meat 2 Pizza', 'بيتزا ميكس ٢', [140, 175, 225, 275]],
  ['pizza-voyage', 'Voyage Pizza', 'بيتزا فواياج', [140, 175, 225, 275]],
];

const PIZZA_CHEESE: Row4[] = [
  ['pizza-margherita', 'Margherita Pizza', 'بيتزا مرجريتا', [105, 150, 195, 245]],
  ['pizza-mixed-cheese', 'Mixed Cheese Pizza', 'بيتزا ميكس تشيز', [110, 165, 215, 265]],
  ['pizza-vegetables', 'Vegetables Pizza', 'بيتزا خضروات', [105, 150, 195, 245]],
  ['pizza-mushroom', 'Mushroom Pizza', 'بيتزا مشروم', [115, 165, 205, 265]],
  ['pizza-tuna', 'Tuna Pizza', 'بيتزا تونة', [135, 170, 225, 275]],
];

const PIZZA_CHICKEN: Row4[] = [
  ['pizza-chicken', 'Chicken Pizza', 'بيتزا فراخ', [110, 160, 210, 255]],
  ['pizza-bbq', 'BBQ Pizza', 'بيتزا باربيكيو', [110, 160, 210, 255]],
  ['pizza-chicken-tiemo', 'Chicken Tiemo Pizza', 'بيتزا تشيكن تيمو', [120, 170, 220, 270]],
  ['pizza-four-season', 'Four Season Pizza', 'بيتزا فورسيزون', [110, 165, 215, 260]],
  ['pizza-chicken-ranch', 'Chicken Ranch Pizza', 'بيتزا تشيكن رانش', [120, 170, 220, 270]],
  ['pizza-chicken-shawarma', 'Chicken Shawarma Pizza', 'بيتزا شارومة فراخ', [110, 165, 215, 265]],
  ['pizza-collection', 'Collection Pizza', 'بيتزا كولكشن', [110, 165, 215, 260]],
  ['pizza-chicken-mix', 'Chicken Mix Pizza', 'بيتزا تشيكن ميكس', [110, 165, 215, 265]],
];

const PIZZA_FASTING: Row4[] = [
  ['pizza-fasting-veg', 'Fasting Vegetables Pizza', 'بيتزا خضار صيامي', [105, 150, 195, 245]],
  ['pizza-fasting-mushroom', 'Fasting Mushroom Pizza', 'بيتزا مشروم صيامي', [115, 165, 205, 265]],
  ['pizza-fasting-tuna', 'Fasting Tuna Pizza', 'بيتزا تونة صيامي', [135, 180, 225, 275]],
];

const FETEER_SAVORY: Row3[] = [
  ['feteer-cheese', 'Cheese Feteer', 'فطيرة جبنة', [110, 175, 225]],
  ['feteer-mixed-cheese', 'Mixed Cheese Feteer', 'فطيرة ميكس تشيز', [120, 175, 225]],
  ['feteer-egg', 'Egg Feteer', 'فطيرة بيض', [100, 130, 165]],
  ['feteer-meat', 'Meat Feteer', 'فطيرة لحمة', [120, 170, 225]],
  ['feteer-sausage', 'Sausage Feteer', 'فطيرة سجق', [120, 170, 225]],
  ['feteer-pastrami', 'Pastrami Feteer', 'فطيرة بسطرمة', [150, 190, 245]],
  ['feteer-hot-dog', 'Hot Dog Feteer', 'فطيرة هوت دوج', [120, 170, 225]],
  ['feteer-mixed-meat', 'Mixed Meat Feteer', 'فطيرة ميكس لحوم', [145, 185, 240]],
  ['feteer-liver', 'Liver Feteer', 'فطيرة كبداكى', [120, 170, 225]],
  ['feteer-bbq', 'BBQ Feteer', 'فطيرة باربيكيو', [120, 170, 225]],
  ['feteer-chicken', 'Chicken Feteer', 'فطيرة فراخ', [120, 170, 225]],
  ['feteer-chicken-shawarma', 'Chicken Shawarma Feteer', 'فطيرة شاورمة فراخ', [120, 170, 225]],
  ['feteer-fasting-veg', 'Fasting Vegetables Feteer', 'فطيرة خضروات صيامي', [120, 155, 220]],
  ['feteer-tuna', 'Tuna Feteer', 'فطيرة تونة', [145, 185, 240]],
  ['feteer-mushroom', 'Mushroom Feteer', 'فطيرة مشروم', [145, 185, 240]],
  ['feteer-fasting-mushroom', 'Fasting Mushroom Feteer', 'فطيرة مشروم صيامي', [145, 185, 240]],
];

const PIZZA_EASTERN: Row3[] = [
  ['east-pastrami', 'Eastern Pastrami Pizza', 'بيتزا بسطرمة', [150, 190, 245]],
  ['east-meat', 'Eastern Meat Pizza', 'بيتزا لحمة', [115, 170, 220]],
  ['east-sausage', 'Eastern Sausage Pizza', 'بيتزا سجق', [115, 170, 220]],
  ['east-chicken', 'Eastern Chicken Pizza', 'بيتزا فراخ', [115, 170, 220]],
  ['east-cheese', 'Eastern Cheese Pizza', 'بيتزا جبنة', [120, 175, 225]],
  ['east-tuna', 'Eastern Tuna Pizza', 'بيتزا تونة', [145, 185, 240]],
  ['east-mixed-meat', 'Eastern Mixed Meat Pizza', 'بيتزا ميكس لحوم', [145, 185, 240]],
];

export const ESMO_A_MENU: MenuItem[] = [
  ...from4(PIZZA_MEAT, SEC.pizzaMeat),
  ...from4(PIZZA_CHEESE, SEC.pizzaCheese),
  ...from4(PIZZA_CHICKEN, SEC.pizzaChicken),
  ...from4(PIZZA_FASTING, SEC.pizzaFasting),

  ...s4('pizza-1x2', 'Pizza 1×2', 'بيتزا 1×2 — اختر أي صنفين', [145, 180, 230, 280], SEC.pizzaCustom),
  item(
    'pizza-stuffed-crust-addon',
    'Stuffed Crust Add-on',
    'بيتزا محشية الأطراف — إضافة 60 ج على ثمن البيتزا (من الحجم الوسط)',
    60,
    SEC.pizzaCustom,
  ),

  ...ml('pizza-smoked-mix', 'Smoked Mix Stuffed Pizza', 'بيتزا ميكس مدخن — حشو سجق مدخن + صوص سموكي', 220, 250, SEC.pizzaSpecial),
  ...ml('pizza-kofta-grill', 'Grilled Kofta Stuffed Pizza', 'بيتزا كفته مشوية — حشو كفته + صوص طحينة', 220, 250, SEC.pizzaSpecial),
  ...ml('pizza-shish-stuffed', 'Shish Tawook Stuffed Pizza', 'بيتزا شيش طاووك — حشو فراخ كريسبي + كاتشب', 220, 250, SEC.pizzaSpecial),
  ...ml('pizza-chicken-strips', 'Chicken Strips Stuffed Pizza', 'بيتزا تشيكن مسحب — حشو موتزاريلا + صوص شيدر', 220, 250, SEC.pizzaSpecial),
  ...ml('pizza-rosetta', 'Rossetta Pizza', 'بيتزا روزيتا — أطراف وردة تشيزي بايتس محشوة موتزاريلا', 220, 250, SEC.pizzaSpecial),
  ...ml('pizza-heart', 'Heart Pizza', 'بيتزا قلب', 185, 235, SEC.pizzaOther),
  item('pizza-mini-kg', 'Mini Pizza (per kg)', 'مينى بيتزا — سعر الكيلو بالجبنة الرومي', 250, SEC.pizzaOther),
  item('pizza-super-family', 'Super Family Pizza', 'بيتزا سوبر فاميلي', 300, SEC.pizzaOther),

  ...from3(FETEER_SAVORY, SEC.feteerSavory),
  ...from3(PIZZA_EASTERN, SEC.pizzaEastern),
  item('feteer-meshaltet', 'Meshaltet Feteer', 'الفطير المشلتت بالسمن البلدي الأصلي', 100, SEC.feteerMeshaltet),

  item('sweet-feteer-fruit', 'Fruit Feteer', 'فطيرة فواكة', 110, SEC.feteerSweet),
  item('sweet-feteer-chocolate', 'Chocolate Feteer', 'فطيرة شيكولاتة', 120, SEC.feteerSweet),
  item('sweet-feteer-kunafa', 'Kunafa Cream Feteer', 'فطيرة كنافة بالكريمة', 100, SEC.feteerSweet),
  item('sweet-feteer-basbousa', 'Basbousa Cream Feteer', 'فطيرة بسبوسة بالكريمة', 100, SEC.feteerSweet),
  item('sweet-feteer-custard-nuts', 'Custard & Nuts Feteer', 'فطيرة كاستر + مكسرات', 100, SEC.feteerSweet),
  item('sweet-feteer-cream-honey', 'Cream Honey Nuts Feteer', 'فطيرة كريمة + عسل + مكسرات', 100, SEC.feteerSweet),
  item('sweet-feteer-cream', 'Cream Feteer', 'فطيرة كريمة', 85, SEC.feteerSweet),
  item('sweet-feteer-plain', 'Plain Feteer', 'فطيرة ساده (بالزيت - بالسمنة)', 60, SEC.feteerSweet),
  item('sweet-feteer-bagasha', 'Bagasha Feteer', 'فطيرة بغاشة (جوزهند + لبن)', 85, SEC.feteerSweet),
  item('sweet-feteer-bagasha-borma', 'Bagasha Borma Feteer', 'فطيرة بغاشة بورمة', 120, SEC.feteerSweet),
  item('sweet-feteer-bagasha-mix', 'Bagasha Mix Feteer', 'فطيرة بغاشة (أطعمة مختلفة)', 95, SEC.feteerSweet),
  item('sweet-feteer-4x4', '4×4 Feteer', 'فطيرة 4×4', 185, SEC.feteerSweet),
  item('sweet-feteer-lotus', 'Lotus Feteer', 'فطيرة لوتس', 130, SEC.feteerSweet),
  item('sweet-feteer-super-lotus', 'Super Lotus Feteer', 'فطيرة سوبر لوتس', 185, SEC.feteerSweet),

  item('sweet-addon-honey', 'Add Honey', 'إضافة عسل', 20, SEC.feteerSweetAddons),
  item('sweet-addon-nuts', 'Add Nuts', 'إضافة مكسرات', 20, SEC.feteerSweetAddons),
  item('sweet-addon-fruit', 'Add Fruit', 'إضافة فاكهة', 20, SEC.feteerSweetAddons),
  item('sweet-addon-chocolate', 'Add Chocolate', 'إضافة شيكولاتة', 30, SEC.feteerSweetAddons),
  item('sweet-addon-basbousa-kunafa', 'Add Basbousa / Kunafa', 'إضافة (بسبوسة - كنافة)', 20, SEC.feteerSweetAddons),
  item('sweet-addon-milk', 'Add Milk', 'إضافة لبن', 15, SEC.feteerSweetAddons),

  item('sand-meat-shawarma', 'Meat Shawarma', 'شاورمة لحمة', 90, SEC.sandwiches),
  item('sand-liver-iskandrani', 'Iskandrani Liver', 'كبدة إسكندراني', 70, SEC.sandwiches),
  item('sand-liver-grill', 'Grill Liver', 'كبدة جريل', 70, SEC.sandwiches),
  item('sand-chicken-shawarma', 'Chicken Shawarma', 'شاورمة فراخ', 90, SEC.sandwiches),
  item('sand-chicken-ranch', 'Chicken Ranch', 'تشيكن رانش', 85, SEC.sandwiches),
  item('sand-chicken-panee', 'Chicken Panee', 'فراخ بانية', 85, SEC.sandwiches),
  item('sand-chicken-roll', 'Chicken Roll', 'تشيكن رول', 85, SEC.sandwiches),
  item('sand-collection', 'Collection', 'كولكشن', 85, SEC.sandwiches),
  item('sand-hot-dog', 'Hot Dog', 'هوت دوج', 75, SEC.sandwiches),
  item('sand-kofta-grill', 'Grill Kofta', 'كفتة جريل', 75, SEC.sandwiches),
  item('sand-sausage-baladi', 'Baladi Sausage', 'سجق بلدي', 70, SEC.sandwiches),

  item('burger-chicken', 'Chicken Burger', 'برجر فراخ', 85, SEC.burgers),
  item('burger-meat', 'Meat Burger', 'برجر لحمة', 85, SEC.burgers),
  item('burger-meat-cheese', 'Meat Burger + Cheese', 'برجر لحمة + جبنة', 95, SEC.burgers),
  item('burger-super-cheesy', 'Super Cheesy Burger', 'سوبر تشيزى برجر', 170, SEC.burgers),
  item('burger-triple-smoke-chicken', 'Triple Smoke Chicken Burger', 'تريبيل سموكى تشيكن برجر', 170, SEC.burgers),
  item('burger-beef-bacon', 'Beef Bacon Burger', 'بـيف بيكون برجر', 170, SEC.burgers),
  item('burger-triple-cheese', 'Triple Cheese Burger', 'تريبيل تشيز برجر', 170, SEC.burgers),

  item('arabic-sausage', 'Arabic Bread — Baladi Sausage', 'ساندوتش عربي — سجق بلدي', 140, SEC.arabicSandwich),
  item('arabic-liver', 'Arabic Bread — Liver', 'ساندوتش عربي — كبدة', 140, SEC.arabicSandwich),
  item('arabic-kofta', 'Arabic Bread — Kofta', 'ساندوتش عربي — كفته', 140, SEC.arabicSandwich),
  item('arabic-meat-shawarma', 'Arabic Bread — Meat Shawarma', 'ساندوتش عربي — شاورمة لحمة', 140, SEC.arabicSandwich),
  item('arabic-chicken-shawarma', 'Arabic Bread — Chicken Shawarma', 'ساندوتش عربي — شاورمة فراخ', 140, SEC.arabicSandwich),
  item('arabic-chicken-ranch', 'Arabic Bread — Chicken Ranch', 'ساندوتش عربي — تشيكن رانش', 140, SEC.arabicSandwich),

  item('corndog', 'Corndog', 'كورن دوج — هوت دوج + عجينة كورن + بطاطس + مستردة وباربيكيو', 120, SEC.corndog),

  item('pasta-negresco', 'Negresco Pasta', 'مكرونة نجرسكو', 140, SEC.pasta),
  item('pasta-chicken', 'Chicken Pasta', 'مكرونة بالفراخ', 140, SEC.pasta),
  item('pasta-kofta', 'Kofta Pasta', 'مكرونة بالكفته', 140, SEC.pasta),
  item('pasta-meat-pieces', 'Grilled Meat Pasta', 'مكرونة بقطع اللحم', 140, SEC.pasta),
  item('pasta-na', 'Pasta Na', 'مكرونة بنا', 140, SEC.pasta),
  item('pasta-alfredo', 'Alfredo Pasta', 'مكرونة ألفريدو', 130, SEC.pasta),
  item('pasta-bolognese', 'Spaghetti Bolognese', 'أسباجتى بلونيز', 130, SEC.pasta),
  item('pasta-napoletana', 'Spaghetti Napoletana', 'أسباجتى نابوليتانا', 110, SEC.pasta),
  item('pasta-spaghetti-chicken', 'Chicken Spaghetti', 'أسباجتى فراخ', 130, SEC.pasta),
  item('pasta-spaghetti-mix-cheese', 'Spaghetti Mix Cheese', 'أسباجتى ميكس تشيز', 140, SEC.pasta),

  item('fries-s', 'Fries (S)', 'بطاطس — صغير', 45, SEC.sides),
  item('fries-l', 'Fries (L)', 'بطاطس — كبير', 75, SEC.sides),
  item('side-addon-meat', 'Add Meat', 'إضافة لحوم', 30, SEC.sides),
  item('side-addon-mozzarella', 'Add Mozzarella', 'إضافة موتزاريلا', 40, SEC.sides),
  item('side-addon-cheese', 'Add Cheese (Romi / Cheddar)', 'إضافة (رومى - تشيدر)', 45, SEC.sides),
  item('side-addon-mushroom', 'Add Mushroom', 'إضافة مشروم', 35, SEC.sides),
  item('side-addon-chicken', 'Add Chicken', 'إضافة فراخ', 30, SEC.sides),
  item('side-addon-pastrami', 'Add Pastrami', 'إضافة بسطرمة', 40, SEC.sides),
  item('side-salad', 'Salad', 'سلطات', 40, SEC.sides),

  item('sauce-cheddar', 'Cheddar Sauce', 'صوص شيدر', 15, SEC.sauces),
  item('sauce-toumeya', 'Toumeya Sauce', 'صوص ثومية', 15, SEC.sauces),
  item('sauce-bbq', 'BBQ Sauce', 'صوص باربيكيو', 15, SEC.sauces),
  item('sauce-ranch', 'Ranch Sauce', 'صوص رانش', 15, SEC.sauces),
  item('sauce-tiemo', 'Tiemo Sauce', 'صوص تيمو', 15, SEC.sauces),
  item('sauce-texas', 'Texas Sauce', 'صوص تكساس', 15, SEC.sauces),
  item('sauce-moka', 'Moka Sauce', 'صوص موكا', 15, SEC.sauces),

  item('drink-water', 'Mineral Water', 'مياه معدنية', 10, SEC.drinks),
  item('drink-can', 'Soft Drink Can', 'كانز', 20, SEC.drinks),
];
