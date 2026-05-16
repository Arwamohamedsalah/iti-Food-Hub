import type { TFunction } from 'i18next';
import type { MenuItem, Restaurant } from '../data/constants';
import { getRestaurantByName } from '../data/constants';

export function isArabic(language?: string): boolean {
  return (language ?? 'en').startsWith('ar');
}

export function menuItemLabel(item: MenuItem, t: TFunction, language?: string): string {
  if (isArabic(language)) return item.nameAr || t(item.name);
  const translated = t(item.name);
  return translated === item.name ? item.name : translated;
}

export function restaurantLabel(restaurant: Restaurant, t: TFunction, language?: string): string {
  if (isArabic(language)) return t(restaurant.nameAr);
  return t(restaurant.name);
}

export function restaurantNameFromStored(
  storedName: string,
  t: TFunction,
  language?: string,
): string {
  const restaurant = getRestaurantByName(storedName);
  if (!restaurant) return storedName;
  return restaurantLabel(restaurant, t, language);
}

export function priceSuffix(language?: string): string {
  return isArabic(language) ? 'ج' : 'EGP';
}

export function formatOrderLine(label: string, price: number, language?: string): string {
  if (price <= 0) return label;
  return `${label} - ${price} ${priceSuffix(language)}`;
}

export function dateLocale(language?: string): string {
  return isArabic(language) ? 'ar-EG' : 'en-US';
}
