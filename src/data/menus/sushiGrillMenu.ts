import type { MenuItem } from '../constants';

type Section = { section: string; sectionAr: string };

const SEC = {
  smoked: { section: 'Smoked Sushi', sectionAr: '💨 ركن المدخن' },
  fried: { section: 'Fried Sushi', sectionAr: '🍤 ركن المقلي' },
  sandwich: { section: 'Sandwiches', sectionAr: '🍔 ركن السندوتشات' },
  inventions: { section: 'Inventions Menu', sectionAr: '🚀 قائمة الاختراعات' },
  fries: { section: 'Fries', sectionAr: '🍟 ركن الفرايز' },
  sauces: { section: 'Sauces', sectionAr: '🍯 أنواع الصوص' },
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

export const SUSHI_GRILL_MENU: MenuItem[] = [
  item(
    'dragon-roll',
    'Dragon Roll',
    'دراجون رول — جمبري، كراب، جبنة',
    25,
    SEC.smoked,
  ),
  item(
    'philadelphia-roll',
    'Philadelphia Roll',
    'فيلادلفيا رول — سلمون مدخن، جبنة، خيار',
    20,
    SEC.smoked,
  ),
  item(
    'sky-fall-roll',
    'Sky Fall Roll',
    'سكاي فل رول — كابوريا، خلطة كابوريا',
    20,
    SEC.smoked,
  ),
  item(
    'cheddar-roll',
    'Cheddar Roll',
    'شيدر رول — كراب، جبنة، شيدر',
    20,
    SEC.smoked,
  ),
  item(
    'ura-maki-roll',
    'Ura Maki Roll',
    'أورا ماكي رول — كراب، جبنة، سمسم أو جمبري',
    20,
    SEC.smoked,
  ),

  item(
    'spider-roll',
    'Spider Roll',
    'سبايدر رول — جمبري، كراب، جبنة',
    25,
    SEC.fried,
  ),
  item(
    'crispy-crab-roll',
    'Crispy Crab Roll',
    'كرسبي كراب رول — كراب، جبنة',
    20,
    SEC.fried,
  ),
  item(
    'crispy-chicken-roll',
    'Crispy Chicken Roll',
    'كرسبي فراخ رول — فراخ، جبنة',
    20,
    SEC.fried,
  ),

  item(
    'cheese-burger',
    'Cheese Burger',
    'برجر جبنة — لحم، جبنة، خس، طماطم',
    75,
    SEC.sandwich,
  ),

  item(
    'sushi-sandwich',
    'Sushi Sandwich',
    'السوشي ساندوتش — متوفر أيام معينة',
    0,
    SEC.inventions,
  ),
  item(
    'sushi-mix-crab-burger',
    'Sushi Mix Crab Burger',
    'برجر سوشي مكس كراب — متوفر أيام معينة',
    0,
    SEC.inventions,
  ),

  item(
    'fries-box',
    'Fries Box',
    'بوكس فرايز — مع اختيار 2 صوص فقط',
    60,
    SEC.fries,
  ),

  item('sauce-habanero', 'Habanero Sauce', 'هالبينو', 0, SEC.sauces),
  item('sauce-ketchup', 'Ketchup', 'كاتشب', 0, SEC.sauces),
  item('sauce-bbq', 'BBQ Sauce', 'باربيكيو', 0, SEC.sauces),
  item('sauce-mayo', 'Mayonnaise', 'مايونيز', 0, SEC.sauces),
  item('sauce-ranch', 'Ranch', 'رانش', 0, SEC.sauces),
  item('sauce-big-tasty', 'Big Tasty', 'بيجي تيست', 0, SEC.sauces),
  item('sauce-spicy-mayo', 'Spicy Mayonnaise', 'سبايسي مايونيز', 0, SEC.sauces),
  item('sauce-cheddar', 'Cheddar Sauce', 'شيدر', 0, SEC.sauces),
  item('sauce-sweet-chili', 'Sweet Chili', 'السويت شيلي', 0, SEC.sauces),
];
