import type { TFunction } from 'i18next';
import type { MenuItem } from '../data/constants';
import { menuItemLabel } from './locale';

function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ');
}

function searchableText(item: MenuItem, t: TFunction, language?: string): string {
  return normalize(
    [
      menuItemLabel(item, t, language),
      item.name,
      item.nameAr,
      item.section,
      item.sectionAr,
    ]
      .filter(Boolean)
      .join(' '),
  );
}

export function filterMenuItems(
  items: MenuItem[],
  query: string,
  t: TFunction,
  language?: string,
  limit = 10,
): MenuItem[] {
  const q = normalize(query);
  if (!q) return [];

  const tokens = q.split(' ').filter(Boolean);

  return items
    .filter(item => {
      const haystack = searchableText(item, t, language);
      if (haystack.includes(q)) return true;
      return tokens.every(token => haystack.includes(token));
    })
    .slice(0, limit);
}
