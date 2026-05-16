import type { MenuItem } from '../constants';

type Section = { section: string; sectionAr: string };

const SEC = {
  pizza: { section: 'Pizza', sectionAr: '🍕 ركن البيتزا' },
  pie: { section: 'Alexandrian Pie', sectionAr: '🥞 ركن الفطير الإسكندراني' },
  pieAddons: { section: 'Pie Add-ons', sectionAr: '🥞 إضافات الفطير الشرقي' },
  tasa: { section: 'Tasa', sectionAr: '🍳 ركن الطاسة' },
  pasta: { section: 'Pasta', sectionAr: '🍝 ركن الباستا' },
  calzone: { section: 'Calzone', sectionAr: '🥟 ركن الكاليزوني' },
  roll: { section: 'Roll', sectionAr: '🌯 ركن الصاروخ' },
  sweetPie: { section: 'Sweet Pie', sectionAr: '🥞 ركن فطير الحلو' },
  addons: { section: 'Add-ons', sectionAr: '➕ الإضافات' },
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

type RowML = [string, string, string, number, number];
type Row3 = [string, string, string, [number, number, number]];

function fromMl(rows: RowML[], sec: Section): MenuItem[] {
  return rows.flatMap(([id, en, ar, m, l]) => ml(id, en, ar, m, l, sec));
}

function from3(rows: Row3[], sec: Section): MenuItem[] {
  return rows.flatMap(([id, en, ar, p]) => s3(id, en, ar, p, sec));
}

const PIZZA: RowML[] = [
  ['pizza-margherita', 'Margherita', 'مارجريتا', 120, 150],
  ['pizza-supreme-meat', 'Supreme Meat', 'سوبريم لحوم', 170, 230],
  ['pizza-tex-mix', 'Tex Mix', 'تكس مكس', 180, 250],
  ['pizza-mixed-cheese', 'Mixed Cheese', 'مكس جبن', 160, 210],
  ['pizza-mixed-cheese-special', 'Mixed Cheese Special', 'مكس جبن سبيشيال', 180, 250],
  ['pizza-chicken-smoke', 'Chicken Smoke', 'تشكن سموك', 180, 280],
  ['pizza-chicken-fire', 'Chicken Fire', 'تشكن فاير', 180, 280],
  ['pizza-sausage', 'Sausage', 'سوسيس', 155, 205],
  ['pizza-sujuk-kiri', 'Sujuk Kiri', 'سجق كيري', 200, 260],
  ['pizza-pastrami', 'Pastrami', 'بسطرمة', 170, 205],
  ['pizza-chicken-ranch', 'Chicken Ranch', 'تشكن رانش', 160, 230],
  ['pizza-texas-burger', 'Texas Burger', 'برجر تكساس', 200, 260],
  ['pizza-gedo-special', 'Gedo Abdo Special', 'جدو عبدو سبيشيال', 200, 280],
  ['pizza-tuna', 'Tuna', 'تونة', 180, 225],
  ['pizza-turkey-chicken', 'Turkey Chicken', 'فراخ تركي', 180, 260],
  ['pizza-salami', 'Salami', 'سلامي', 150, 200],
  ['pizza-sujuk', 'Sujuk', 'سجق', 150, 200],
  ['pizza-chicken', 'Chicken', 'فراخ', 155, 205],
  ['pizza-bbq-chicken', 'BBQ Chicken', 'فراخ باربيكيو', 160, 220],
  ['pizza-crispy-ranch', 'Crispy Ranch', 'كرسبي رانش', 180, 240],
  ['pizza-crispy-bbq', 'Crispy BBQ', 'كرسبي باربيكيو', 180, 240],
  ['pizza-gedo-lovers', 'Gedo Abdo Lovers', 'عشاق جدو عبدو', 180, 250],
];

const SAVORY_PIE: Row3[] = [
  ['pie-sujuk-kiri', 'Sujuk Kiri Pie', 'سجق كيري', [120, 180, 230]],
  ['pie-mixed-chicken', 'Mixed Chicken Pie', 'مكس فراخ', [165, 210, 250]],
  ['pie-chicken-ranch', 'Chicken Ranch Pie', 'تشكن رانش', [150, 220, 260]],
  ['pie-chicken-salami', 'Chicken Salami Pie', 'تشكن سلامي', [150, 220, 285]],
  ['pie-chicken-coal', 'Chicken on Coal Pie', 'فراخ على الفحم', [130, 190, 250]],
  ['pie-pastrami-kiri', 'Pastrami Kiri Pie', 'بسطرمة كيري', [140, 200, 250]],
  ['pie-salami-kiri', 'Salami Kiri Pie', 'سلامي كيري', [140, 200, 280]],
  ['pie-sujuk-pastrami-kiri', 'Sujuk Pastrami Kiri Pie', 'سجق بسطرمة كيري', [160, 250, 300]],
  ['pie-pastrami', 'Pastrami Pie', 'بسطرمة', [140, 185, 250]],
  ['pie-sujuk', 'Sujuk Pie', 'سجق', [100, 150, 195]],
  ['pie-romi-cheese', 'Romi Cheese Pie', 'جبن رومي', [110, 150, 200]],
  ['pie-tuna', 'Tuna Pie', 'تونة', [135, 175, 220]],
  ['pie-shrimp', 'Shrimp Pie', 'جمبري', [170, 230, 280]],
  ['pie-sea-ranch', 'Sea Ranch Pie', 'سي رانش', [180, 250, 300]],
  ['pie-fasting', 'Fasting Pie', 'صيامي', [90, 125, 140]],
  ['pie-mixed-meat', 'Mixed Meat Pie', 'مكس لحوم', [160, 200, 260]],
  ['pie-smoke-turkey', 'Smoked Turkey Pie', 'سموك تركي', [130, 160, 240]],
  ['pie-hot-dog', 'Hot Dog Pie', 'هوت دوج', [110, 160, 200]],
  ['pie-minced-meat', 'Minced Meat Pie', 'لحمة مفرومة', [120, 180, 230]],
  ['pie-mixed-cheese', 'Mixed Cheese Pie', 'مكس جبن', [130, 170, 225]],
  ['pie-sujuk-mixed-cheese', 'Sujuk Mixed Cheese Pie', 'سجق مكس جبن', [150, 230, 270]],
  ['pie-mushroom', 'Mushroom Pie', 'مشروم', [100, 130, 180]],
  ['pie-bbq-chicken', 'BBQ Chicken Pie', 'فراخ باربيكيو', [140, 200, 250]],
  ['pie-chicken', 'Chicken Pie', 'فراخ', [130, 190, 240]],
  ['pie-gedo-special', 'Gedo Abdo Special Pie', 'جدو عبدو سبيشيال (مكس مدخنات)', [160, 230, 270]],
  ['pie-chicken-kiri', 'Chicken Kiri Pie', 'فراخ كيري', [140, 220, 290]],
  ['pie-crispy-chicken', 'Crispy Chicken Pie', 'فراخ كرسبي', [140, 200, 280]],
];

const SWEET_PIE: RowML[] = [
  ['sweet-mixed-chocolate', 'Mixed Chocolate', 'مكس شوكلت', 60, 100],
  ['sweet-sultan', 'Sultan', 'السلطان', 100, 150],
  ['sweet-malawi', 'Malawi', 'ملوكي', 100, 150],
  ['sweet-gedo', 'Gedo Abdo', 'جدو عبدو', 130, 170],
  ['sweet-apple-cinnamon', 'Apple Cinnamon', 'تفاح قرفة', 100, 130],
  ['sweet-four-season', 'Four Season', 'فور سيزون', 120, 170],
  ['sweet-dubai', 'Dubai', 'دبي', 90, 120],
  ['sweet-basbousa-kunafa', 'Basbousa & Kunafa', 'بسبوسة وكنافة', 70, 90],
  ['sweet-banana-chocolate', 'Banana Chocolate', 'شيكولاتة موز', 80, 120],
  ['sweet-chocolate', 'Chocolate', 'شيكولاتة', 60, 90],
  ['sweet-nutella', 'Nutella', 'نوتيلا', 140, 200],
  ['sweet-lotus', 'Lotus', 'لوتس', 80, 120],
  ['sweet-sugar', 'Sugar', 'سكر', 30, 50],
  ['sweet-bogasha', 'Bogasha', 'بوغاشة', 60, 70],
  ['sweet-chocolate-oreo', 'Chocolate Oreo', 'شيكولاتة بوريو', 90, 120],
  ['sweet-bogasha-nuts', 'Bogasha Nuts', 'بوغاشة مكسرات', 70, 100],
  ['sweet-dates', 'Dates', 'بلح', 70, 100],
  ['sweet-belgian-lotus', 'Belgian Lotus', 'لوتس بلجيكي', 140, 180],
  ['sweet-fruits', 'Fruits', 'فواكه', 140, 160],
  ['sweet-custard', 'Custard', 'كاستر', 40, 60],
  ['sweet-meshaltet', 'Meshaltet', 'مشلتت', 100, 130],
];

export const GEDO_ABDO_MENU: MenuItem[] = [
  ...fromMl(PIZZA, SEC.pizza),
  item(
    'pizza-stuffed-crust',
    'Mozzarella Stuffed Crust Add-on',
    'إضافة أطراف محشوة بجبن الموزاريلا',
    50,
    SEC.pizza,
  ),

  ...from3(SAVORY_PIE, SEC.pie),
  item('pie-eastern-s', 'Eastern Pie / Shabizza (S)', 'فطير شرقي وش بيتزا — صغير', 10, SEC.pieAddons),
  item('pie-eastern-m', 'Eastern Pie / Shabizza (M)', 'فطير شرقي وش بيتزا — وسط', 25, SEC.pieAddons),
  item('pie-eastern-l', 'Eastern Pie / Shabizza (L)', 'فطير شرقي وش بيتزا — كبير', 30, SEC.pieAddons),

  item('tasa-mixed-meat', 'Mixed Meat Tasa', 'مكس لحوم', 170, SEC.tasa),
  item('tasa-mixed-smoked', 'Mixed Smoked Tasa', 'مكس مدخنات', 160, SEC.tasa),
  item('tasa-mixed-chicken', 'Mixed Chicken Tasa', 'مكس فراخ', 150, SEC.tasa),
  item('tasa-chicken-fajita', 'Chicken Fajita Tasa', 'فاهيتا فراخ', 160, SEC.tasa),
  item('tasa-meat-potato', 'Meat & Potato Tasa', 'لحمة بطاطس', 150, SEC.tasa),
  item('tasa-burger', 'Burger Tasa', 'برجر', 150, SEC.tasa),
  item('tasa-crispy', 'Crispy Tasa', 'كرسبي', 150, SEC.tasa),

  item('pasta-sujuk-mixed-cheese', 'Sujuk Mixed Cheese Pasta', 'سجق مكس جبن', 180, SEC.pasta),
  item('pasta-crispy-ranch', 'Crispy Ranch Pasta', 'كرسبي رانش', 150, SEC.pasta),
  item('pasta-mixed-chicken', 'Mixed Chicken Pasta', 'مكس فراخ', 150, SEC.pasta),
  item('pasta-mixed-cheese', 'Mixed Cheese Pasta', 'مكس جبن', 160, SEC.pasta),
  item('pasta-gedo-special', 'Gedo Abdo Special Pasta', 'جدو عبدو سبيشيال', 180, SEC.pasta),
  item('pasta-mac-cheese', 'Mac & Cheese', 'ماك أند تشيز', 150, SEC.pasta),
  item('pasta-alfredo', 'Alfredo', 'ألفريدو', 160, SEC.pasta),
  item('pasta-bolognese', 'Spaghetti Bolognese', 'بلونيز اسباجتي', 120, SEC.pasta),
  item('pasta-red-chicken', 'Red Chicken Pasta', 'ريد فراخ', 100, SEC.pasta),
  item('pasta-negresco', 'Negresco', 'جنجرسكو', 120, SEC.pasta),

  item('calzone-chicken', 'Chicken Calzone', 'كاليزوني فراخ', 150, SEC.calzone),
  item('calzone-mixed-cheese', 'Mixed Cheese Calzone', 'كاليزوني مكس جبن', 150, SEC.calzone),
  item('calzone-pastrami-kiri', 'Pastrami Kiri Calzone', 'كاليزوني بسطرمة كيري', 150, SEC.calzone),
  item('calzone-sujuk-kiri', 'Sujuk Kiri Calzone', 'كاليزوني سجق كيري', 120, SEC.calzone),

  item('roll-chicken-ranch', 'Chicken Ranch Roll', 'صاروخ تشكن رانش', 150, SEC.roll),
  item('roll-sujuk-kiri', 'Sujuk Kiri Roll', 'صاروخ سجق كيري', 150, SEC.roll),
  item('roll-mixed-cheese', 'Mixed Cheese Roll', 'صاروخ مكس جبن', 150, SEC.roll),
  item('roll-mixed-chicken', 'Mixed Chicken Roll', 'صاروخ مكس فراخ', 150, SEC.roll),

  ...fromMl(SWEET_PIE, SEC.sweetPie),

  item('add-cheese-fries', 'Cheese Fries', 'بطاطس جبنة سايحة', 25, SEC.addons),
  item('add-boom-fries', 'Boom Fries', 'بطاطس بوم فريت', 25, SEC.addons),
  item('add-mozzarella', 'Mozzarella', 'جبن موزريلا', 25, SEC.addons),
  item('add-romi', 'Romi Cheese', 'جبن رومي', 25, SEC.addons),
  item('add-aged-cheese', 'Aged Cheese', 'جبنة قديمة', 25, SEC.addons),
  item('add-hot-sauce', 'Hot Sauce', 'صوص حار', 10, SEC.addons),
  item('add-bbq-sauce', 'BBQ Sauce', 'صوص باربيكيو', 25, SEC.addons),
  item('add-ranch-sauce', 'Ranch Sauce', 'صوص رانش', 25, SEC.addons),
  item('add-honey', 'Black Honey', 'عسل أسود', 25, SEC.addons),
  item('add-pistachio', 'Pistachio', 'بستاشيو', 25, SEC.addons),
  item('add-chocolate', 'Chocolate', 'شيكولاتة', 25, SEC.addons),
  item('add-caramel', 'Caramel', 'كراميل', 25, SEC.addons),
  item('add-cream', 'Cream', 'قشطة', 25, SEC.addons),

  item('drink-water', 'Small Mineral Water', 'مياه معدنية صغيرة', 10, SEC.drinks),
  item('drink-coca-cola', 'Coca-Cola', 'كوكاكولا', 25, SEC.drinks),
  item('drink-sprite', 'Sprite', 'سبيرو سباتس', 25, SEC.drinks),
  item('drink-pepsi', 'Pepsi', 'في كولا', 25, SEC.drinks),
];
