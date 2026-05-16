import { CheckCircle2, Star } from 'lucide-react';
import { Restaurant } from '../data/constants';
import { useTranslation } from 'react-i18next';
import { restaurantLabel } from '../lib/locale';

interface Props {
  restaurant: Restaurant;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function RestaurantCard({ restaurant, selected, onSelect }: Props) {
  const { t, i18n } = useTranslation();
  const popularItems = restaurant.popular.slice(0, 3);

  return (
    <button
      type="button"
      onClick={() => onSelect(restaurant.id)}
      className={`relative flex h-full min-h-[220px] w-full flex-col rounded-2xl border-2 p-5 text-start transition-all duration-200 focus:outline-none ${
        selected
          ? 'border-iti-red bg-gradient-to-br from-iti-50 to-iti-50/80 shadow-md shadow-iti-red/10 ring-2 ring-iti-red/15'
          : 'border-iti-100 bg-white shadow-sm hover:border-iti-red/35 hover:bg-iti-50/30 hover:shadow-md'
      }`}
    >
      {selected && (
        <span className="absolute end-3 top-3">
          <CheckCircle2 size={20} className="text-iti-red" />
        </span>
      )}

      <div className="flex flex-1 items-start gap-4 pe-7">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-iti-100 bg-iti-50 text-3xl">
          {restaurant.emoji}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="text-base font-bold leading-tight text-gray-900">
            {restaurantLabel(restaurant, t, i18n.language)}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
            {t(restaurant.description)}
          </p>
        </div>
      </div>

      <div className="mt-4 min-h-[92px] rounded-xl border border-iti-100 bg-iti-50/50 p-3.5">
        {popularItems.length > 0 ? (
          <>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase text-iti-red-dark">
              <Star size={13} className="shrink-0 text-iti-red" />
              {t('Popular')}
            </div>
            <div className="flex flex-wrap gap-2">
              {popularItems.map(item => (
                <span
                  key={item}
                  className="rounded-lg border border-iti-100 bg-white px-2.5 py-1 text-xs text-gray-800"
                >
                  {t(item)}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </button>
  );
}
