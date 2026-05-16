import { CheckCircle2, Star } from 'lucide-react';
import { Restaurant } from '../data/constants';
import { useTranslation } from 'react-i18next';

interface Props {
  restaurant: Restaurant;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function RestaurantCard({ restaurant, selected, onSelect }: Props) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={() => onSelect(restaurant.id)}
      className={`relative w-full rounded-2xl p-5 transition-all duration-200 focus:outline-none border-2 ${
        selected
          ? 'bg-gradient-to-br from-iti-50 to-iti-50/80 border-iti-red shadow-md shadow-iti-red/10 ring-2 ring-iti-red/15'
          : 'bg-white border-iti-100/80 shadow-sm hover:shadow-md hover:border-iti-red/35 hover:bg-iti-50/30'
      }`}
    >
      {selected && (
        <span className="absolute top-3 right-3">
          <CheckCircle2 size={20} className="text-iti-red" />
        </span>
      )}

      <div className="flex flex-col h-full justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 rounded-xl bg-iti-50 border border-iti-100 flex items-center justify-center text-3xl shadow-xs">
              {restaurant.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-gray-900 text-base leading-tight truncate">{t(restaurant.name)}</div>
              <div className="text-xs text-gray-600 font-medium mt-0.5" dir="rtl">{t(restaurant.nameAr)}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-lg border border-iti-red/25 bg-iti-red/8 px-3 py-1 text-xs font-semibold uppercase text-iti-red-dark">
              {t(restaurant.category)}
            </div>
            <p className="text-sm text-gray-700 leading-5">{t(restaurant.description)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-iti-100 bg-iti-50/50 p-3">
          <div className="flex items-center gap-2 mb-2 text-xs text-iti-red-dark font-semibold uppercase">
            <Star size={13} className="text-iti-red" />
            Popular
          </div>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.popular.slice(0, 3).map(item => (
              <span key={item} className="text-xs text-gray-800 rounded-md border border-iti-100 bg-white px-2.5 py-1">
                {t(item)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
