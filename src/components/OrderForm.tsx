import { useState, useEffect } from 'react';
import { Send, ChevronDown, Zap, Truck } from 'lucide-react';
import { TRACKS, RESTAURANTS } from '../data/constants';
import RestaurantCard from './RestaurantCard';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { formatEgp, getOrderTotals } from '../lib/orderTotals';

interface Props {
  sessionId: string;
  onOrderPlaced: () => void;
}

export default function OrderForm({ sessionId, onOrderPlaced }: Props) {
  const { t, i18n } = useTranslation();
  const [studentName, setStudentName] = useState('');
  const [track, setTrack] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [items, setItems] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const selectedRestaurant = RESTAURANTS.find(r => r.id === restaurantId);

  useEffect(() => {
    setDeliveryFee('');
  }, [restaurantId]);

  const deliveryAmount = Math.max(0, parseFloat(deliveryFee) || 0);
  const orderTotals = getOrderTotals(items, deliveryAmount);

  const handleQuickFill = (item: string) => {
    setItems(prev => prev ? `${prev}, ${item}` : item);
  };

  const handleAddMenuItem = (menuItem: Restaurant['menu'][number]) => {
    const menuLine = `${menuItem.name} - ${menuItem.price} ج`;
    setItems(prev => prev ? `${prev}, ${menuLine}` : menuLine);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim() || !track || !restaurantId || !items.trim()) {
      setError('Please fill in all fields before submitting.');
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from('orders').insert({
      student_name: studentName.trim(),
      track,
      restaurant: selectedRestaurant?.name ?? restaurantId,
      items: items.trim(),
      delivery_fee: Math.round(deliveryAmount),
      session_id: sessionId,
    });

    setLoading(false);

    if (insertError) {
      setError('Failed to submit order. Please try again.');
      return;
    }

    setSuccess(true);
    setStudentName('');
    setTrack('');
    setRestaurantId('');
    setItems('');
    setDeliveryFee('');
    onOrderPlaced();

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-iti-100 overflow-hidden shadow-xl shadow-iti-red/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-iti-red to-iti-red-dark px-5 py-4 border-b border-white/10">
        <h2 className="text-white font-bold text-lg">{t("Place Your Order")}</h2>
        <p className="text-white/85 text-xs mt-0.5">{t("Add your order to today's group list")}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 bg-gradient-to-b from-iti-50/40 to-white">
        {/* Student name */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">{t("Your Name")}</label>
          <input
            type="text"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            placeholder="e.g. Ahmed Mohamed"
            className="w-full rounded-xl border border-iti-100 bg-stone-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-iti-red/30 focus:border-iti-red transition"
          />
        </div>

        {/* Track selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">{t("Your Track")}</label>
          <div className="relative">
            <select
              value={track}
              onChange={e => setTrack(e.target.value)}
              className="w-full appearance-none rounded-xl border border-iti-100 bg-stone-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-iti-red/30 focus:border-iti-red transition pr-10"
            >
              <option value="" className="bg-white">{t("Select your ITI track...")}</option>
              {TRACKS.map(t => (
                <option key={t} value={t} className="bg-white">{t}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Restaurant selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">{t("Choose Restaurant")}</label>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
            {RESTAURANTS.map(r => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                selected={restaurantId === r.id}
                onSelect={setRestaurantId}
              />
            ))}
          </div>
        </div>

        {/* Menu items */}
        {selectedRestaurant && selectedRestaurant.menu.length > 0 && (
          <div className="rounded-xl border border-iti-100 bg-white p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-iti-red-dark">{selectedRestaurant.name} {t("Menu")}</p>
                <p className="text-xs text-gray-600">{t("قائمة")} {selectedRestaurant.nameAr} {t("والأسعار")}</p>
              </div>
              <span className="text-xs text-gray-500">{t("Tap to add")}</span>
            </div>
            <div className="grid gap-2">
              {selectedRestaurant.menu.map(menuItem => (
                <button
                  key={menuItem.id}
                  type="button"
                  onClick={() => handleAddMenuItem(menuItem)}
                  className="w-full rounded-xl border border-iti-100 bg-stone-50/80 px-4 py-3 text-left hover:bg-iti-50/60 transition flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{t(menuItem.name)}</div>
                    <div className="text-xs text-gray-600">{t(menuItem.nameAr)}</div>
                  </div>
                  <div className="text-sm font-bold text-iti-red">{menuItem.price} ج</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedRestaurant && selectedRestaurant.menu.length === 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
            <p className="font-semibold text-amber-900">{t("قائمة الأسعار غير متاحة حالياً")}</p>
            <p className="text-xs text-amber-800/90 mt-1">{t("ارفع ملف PDF للمطعم أو أدخل قائمة الأسعار لتظهر هنا.")}</p>
          </div>
        )}

        {selectedRestaurant && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              <span className="flex items-center gap-1.5">
                <Zap size={13} className="text-iti-red" />
                {t("Popular at")} {selectedRestaurant.name}
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedRestaurant.popular.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleQuickFill(item)}
                  className="text-xs bg-iti-50 border border-iti-200 text-iti-red-dark font-medium rounded-full px-3 py-1.5 hover:bg-iti-100/80 transition"
                >
                  + {t(item)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1.5">{t("Your Order Items")}</label>
          <textarea
            value={items}
            onChange={e => setItems(e.target.value)}
            placeholder={t("e.g. 2 Meat Fiteer, 1 Pepsi")}
            rows={3}
            className="w-full rounded-xl border border-iti-100 bg-stone-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-iti-red/30 focus:border-iti-red transition resize-none"
          />
        </div>

        {selectedRestaurant && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-iti-red" />
                {t("Delivery fee")}
              </span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                step={1}
                value={deliveryFee}
                onChange={e => setDeliveryFee(e.target.value)}
                placeholder={t("Enter delivery fee")}
                className="w-full max-w-[140px] rounded-xl border border-iti-100 bg-stone-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-iti-red/30 focus:border-iti-red transition"
              />
              <span className="text-sm font-semibold text-gray-600">{t("EGP")}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t("Delivery fee hint")}</p>
          </div>
        )}

        {selectedRestaurant && (orderTotals.hasParsedPrices || deliveryAmount > 0) && (
          <div className="rounded-xl border border-iti-100 bg-iti-50/50 p-4 space-y-2 text-sm">
            <p className="font-bold text-iti-red-dark">{t("Order total")}</p>
            <div className="flex justify-between text-gray-700">
              <span>{t("Food subtotal")}</span>
              <span className="font-semibold">
                {orderTotals.hasParsedPrices ? formatEgp(orderTotals.foodSubtotal, i18n.language) : '—'}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{t("Delivery fee")}</span>
              <span className="font-semibold">{formatEgp(orderTotals.deliveryFee, i18n.language)}</span>
            </div>
            <div className="flex justify-between text-iti-red font-black pt-2 border-t border-iti-100">
              <span>{t("Total")}</span>
              <span>{formatEgp(orderTotals.total, i18n.language)}</span>
            </div>
            {!orderTotals.hasParsedPrices && items.trim() && (
              <p className="text-xs text-gray-500">{t("Add prices with ج in items to calculate food total")}</p>
            )}
          </div>
        )}

        {error && (
          <div className="text-sm text-iti-red-dark bg-iti-50 border border-iti-200 rounded-xl px-4 py-2.5">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 font-medium">
            {t("Order submitted successfully!")}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-iti-red to-iti-red-dark text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-60 shadow-lg shadow-iti-red/25"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send size={16} />
              {t("Submit Order")}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
