import type { MenuItem } from '../constants';

type Section = { section: string; sectionAr: string };

const SEC = {
  syrian: { section: 'Syrian Bread', sectionAr: '🌯 ركن العيش السوري' },
  french: { section: 'French Bread', sectionAr: '🍔 ركن الفرنساوي' },
  sandwiches: { section: 'New Sandwiches', sectionAr: '🥪 الساندوتشات الجديدة' },
  packets: { section: 'Packets', sectionAr: '🍟 ركن البكيتات' },
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

export const BATATES_KTEER_MENU: MenuItem[] = [
  item('syrian-fries-plain', 'Plain Fries', 'بطاطس ساده', 30, SEC.syrian),
  item('syrian-fries-mozzarella', 'Mozzarella Fries', 'بطاطس مودزاريلا', 35, SEC.syrian),
  item('syrian-chicken-panee', 'Chicken Panee', 'فراخ بانيه', 35, SEC.syrian),
  item('syrian-chicken-panee-mozzarella', 'Chicken Panee Mozzarella', 'فراخ بانيه مودزاريلا', 40, SEC.syrian),
  item('syrian-crispy', 'Crispy', 'كريسبي', 45, SEC.syrian),
  item('syrian-crispy-mozzarella', 'Crispy Mozzarella', 'كريسبي مودزاريلا', 50, SEC.syrian),
  item('syrian-strips', 'Strips', 'استربس', 45, SEC.syrian),
  item('syrian-strips-mozzarella', 'Strips Mozzarella', 'استربس مودزاريلا', 50, SEC.syrian),
  item('syrian-zinger', 'Zinger', 'زنجر', 45, SEC.syrian),
  item('syrian-zinger-mozzarella', 'Zinger Mozzarella', 'زنجر مودزاريلا', 50, SEC.syrian),
  item('syrian-sujuk', 'Sujuk', 'سجق', 35, SEC.syrian),
  item('syrian-sujuk-mozzarella', 'Sujuk Mozzarella', 'سجق مودزاريلا', 40, SEC.syrian),

  item('french-burger-plain', 'Plain Burger', 'برجر ساده', 35, SEC.french),
  item('french-burger-cheese', 'Cheese Burger', 'برجر جبنة', 40, SEC.french),
  item('french-burger-egg', 'Egg Burger', 'برجر بيض', 40, SEC.french),
  item('french-burger-mix', 'Mix Burger', 'برجر مكس', 45, SEC.french),
  item('french-hawawshi-meat', 'Meat Hawawshi', 'حواوشي لحمة', 30, SEC.french),
  item('french-hawawshi-mozzarella', 'Mozzarella Hawawshi', 'حواوشي مودزاريلا', 35, SEC.french),

  item('new-cheddar-sandwich', 'Cheddar Sandwich', 'شيدر ساندوتش', 50, SEC.sandwiches),
  item('new-cheddar-mozzarella', 'Cheddar Mozzarella', 'شيدر مودزاريلا', 55, SEC.sandwiches),
  item('new-super-fire', 'Super Fire', 'سوبر فاير', 50, SEC.sandwiches),
  item('new-super-fire-mozzarella', 'Super Fire Mozzarella', 'سوبر فاير مودزاريلا', 55, SEC.sandwiches),
  item('new-ranch-sandwich', 'Ranch Sandwich', 'رانش ساندوتس', 50, SEC.sandwiches),
  item('new-ranch-mozzarella', 'Ranch Mozzarella', 'رانش ساندوتس مودزاريلا', 55, SEC.sandwiches),
  item('new-smoky-sandwich', 'Smoky Sandwich', 'سموكي ساندوتش', 50, SEC.sandwiches),
  item('new-smoky-mozzarella', 'Smoky Mozzarella', 'سموكي ساندوتش مودزاريلا', 55, SEC.sandwiches),
  item('new-chicken-shawarma', 'Chicken Shawarma', 'شاورما فراخ', 45, SEC.sandwiches),
  item('new-chicken-shawarma-mozzarella', 'Chicken Shawarma Mozzarella', 'شاورما فراخ مودزاريلا', 50, SEC.sandwiches),
  item('new-syrian-kofta', 'Syrian Kofta', 'كفتة سوري', 55, SEC.sandwiches),

  item('packet-mexicana', 'Mexicana', 'مكسكانا', 55, SEC.packets),
  item('packet-batates-kteer', 'Batates Kteer', 'بطاطس كتير', 35, SEC.packets),
  item('packet-fries-30', 'Fries (30)', 'بطاطس — 30 ج', 30, SEC.packets),
  item('packet-fries-25', 'Fries (25)', 'بطاطس — 25 ج', 25, SEC.packets),
];
