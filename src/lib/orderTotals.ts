/** Sum prices from item lines like "Foul - 10 ج" or "2 x Burger 85 EGP". */
export function parseFoodSubtotal(items: string): number {
  let total = 0;
  const pricePattern = /(\d+(?:\.\d+)?)\s*(?:ج\.?|EGP|egp|جنيه)/gi;
  for (const match of items.matchAll(pricePattern)) {
    total += parseFloat(match[1]);
  }
  return total;
}

export function getOrderTotals(items: string, deliveryFee: number) {
  const foodSubtotal = parseFoodSubtotal(items);
  const delivery = Math.max(0, Number.isFinite(deliveryFee) ? deliveryFee : 0);
  return {
    foodSubtotal,
    deliveryFee: delivery,
    total: foodSubtotal + delivery,
    hasParsedPrices: foodSubtotal > 0,
  };
}

export function formatEgp(amount: number, locale = 'en'): string {
  const n = Math.round(amount);
  return locale.startsWith('ar') ? `${n} ج` : `${n} EGP`;
}
