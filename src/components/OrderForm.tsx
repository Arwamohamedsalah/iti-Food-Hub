import { useState, useEffect, useMemo, useRef } from 'react';
import { Send, ChevronDown, Zap, Truck, X, Plus, Search } from 'lucide-react';
import { TRACKS, RESTAURANTS, type MenuItem } from '../data/constants';
import RestaurantCard from './RestaurantCard';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { formatEgp, getOrderTotals } from '../lib/orderTotals';
import {
  formatOrderLine,
  isArabic,
  menuItemLabel,
  restaurantLabel,
} from '../lib/locale';
import { filterMenuItems } from '../lib/menuSearch';

interface Props {
  sessionId: string;
  onOrderPlaced: () => void;
}

export default function OrderForm({ sessionId, onOrderPlaced }: Props) {
  const { t, i18n } = useTranslation();
  const [studentName, setStudentName] = useState('');
  const [track, setTrack] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [orderLines, setOrderLines] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const [deliveryFee, setDeliveryFee] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const selectedRestaurant = RESTAURANTS.find(r => r.id === restaurantId);

  const menuSections = useMemo(() => {
    if (!selectedRestaurant?.menu.length) return [];
    const groups = new Map<string, { title: string; titleAr: string; items: MenuItem[] }>();
    for (const menuItem of selectedRestaurant.menu) {
      const key = menuItem.section ?? '';
      if (!groups.has(key)) {
        groups.set(key, {
          title: menuItem.section ?? t('Menu'),
          titleAr: menuItem.sectionAr ?? t('Menu'),
          items: [],
        });
      }
      groups.get(key)!.items.push(menuItem);
    }
    return [...groups.values()];
  }, [selectedRestaurant, t]);

  useEffect(() => {
    setDeliveryFee('');
    setCustomItem('');
    setShowSuggestions(false);
  }, [restaurantId]);

  const searchSuggestions = useMemo(() => {
    if (!selectedRestaurant?.menu.length || !customItem.trim()) return [];
    return filterMenuItems(
      selectedRestaurant.menu,
      customItem,
      t,
      i18n.language,
      12,
    );
  }, [selectedRestaurant, customItem, t, i18n.language]);

  useEffect(() => {
    setActiveSuggestion(0);
  }, [customItem, searchSuggestions.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const deliveryAmount = Math.max(0, parseFloat(deliveryFee) || 0);
  const itemsText = orderLines.join(', ');
  const orderTotals = getOrderTotals(itemsText, deliveryAmount);

  const addOrderLine = (line: string) => {
    const trimmed = line.trim();
    if (trimmed) setOrderLines(prev => [...prev, trimmed]);
  };

  const removeOrderLine = (index: number) => {
    setOrderLines(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuickFill = (item: string) => {
    addOrderLine(item);
  };

  const handleAddMenuItem = (menuItem: MenuItem) => {
    const label = menuItemLabel(menuItem, t, i18n.language);
    addOrderLine(formatOrderLine(label, menuItem.price, i18n.language));
  };

  const selectMenuSuggestion = (menuItem: MenuItem) => {
    handleAddMenuItem(menuItem);
    setCustomItem('');
    setShowSuggestions(false);
  };

  const handleAddCustomItem = () => {
    if (showSuggestions && searchSuggestions[activeSuggestion]) {
      selectMenuSuggestion(searchSuggestions[activeSuggestion]);
      return;
    }
    addOrderLine(customItem);
    setCustomItem('');
    setShowSuggestions(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || searchSuggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddCustomItem();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(i => (i + 1) % searchSuggestions.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(
        i => (i - 1 + searchSuggestions.length) % searchSuggestions.length,
      );
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      selectMenuSuggestion(searchSuggestions[activeSuggestion]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim() || !track || !restaurantId || orderLines.length === 0) {
      setError(t('Please fill in all fields before submitting.'));
      return;
    }

    setLoading(true);
    const { error: insertError } = await supabase.from('orders').insert({
      student_name: studentName.trim(),
      track,
      restaurant: selectedRestaurant?.name ?? restaurantId,
      items: itemsText,
      delivery_fee: Math.round(deliveryAmount),
      session_id: sessionId,
    });

    setLoading(false);

    if (insertError) {
      setError(t('Failed to submit order. Please try again.'));
      return;
    }

    setSuccess(true);
    setStudentName('');
    setTrack('');
    setRestaurantId('');
    setOrderLines([]);
    setCustomItem('');
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
              {TRACKS.map(trackName => (
                <option key={trackName} value={trackName} className="bg-white">
                  {t(trackName)}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Restaurant selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">{t("Choose Restaurant")}</label>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <p className="text-sm font-semibold text-iti-red-dark">
                  {restaurantLabel(selectedRestaurant, t, i18n.language)} — {t('Menu')}
                </p>
              </div>
              <span className="text-xs text-gray-500">{t("Tap to add")}</span>
            </div>
            <div className="grid gap-4 max-h-[min(70vh,520px)] overflow-y-auto pr-1">
              {menuSections.map(section => (
                <div key={section.title} className="space-y-2">
                  <p className="text-xs font-bold text-iti-red-dark sticky top-0 bg-white py-1.5 border-b border-iti-100 z-10">
                    {isArabic(i18n.language) ? section.titleAr : section.title}
                  </p>
                  <div className="grid gap-2">
                    {section.items.map(menuItem => (
                <button
                  key={menuItem.id}
                  type="button"
                  onClick={() => handleAddMenuItem(menuItem)}
                  className="w-full rounded-xl border border-iti-100 bg-stone-50/80 px-4 py-3 text-left hover:bg-iti-50/60 hover:border-iti-red/40 transition flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900">
                      {menuItemLabel(menuItem, t, i18n.language)}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-iti-red flex-shrink-0">
                    {menuItem.price > 0
                      ? `${menuItem.price} ${isArabic(i18n.language) ? 'ج' : 'EGP'}`
                      : '—'}
                  </div>
                      </button>
                    ))}
                  </div>
                </div>
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
                {t('Popular at')} {restaurantLabel(selectedRestaurant, t, i18n.language)}
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
          <label className="block text-sm font-semibold text-gray-800 mb-2">{t("Your Order Items")}</label>

          {orderLines.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {orderLines.map((line, index) => (
                <div
                  key={`${line}-${index}`}
                  className="inline-flex items-center gap-2 max-w-full rounded-xl border-2 border-iti-red bg-iti-50 px-3 py-2 text-sm font-semibold text-iti-red-dark shadow-sm shadow-iti-red/10"
                >
                  <span className="break-words">{line}</span>
                  <button
                    type="button"
                    onClick={() => removeOrderLine(index)}
                    className="flex-shrink-0 rounded-lg p-0.5 text-iti-red hover:bg-iti-red/15 transition"
                    aria-label={t("Remove item")}
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mb-3">{t("Tap menu items or add below")}</p>
          )}

          <div className="flex gap-2">
            <div ref={searchRef} className="relative flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={customItem}
                onChange={e => {
                  setCustomItem(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleSearchKeyDown}
                autoComplete="off"
                placeholder={
                  selectedRestaurant?.menu.length
                    ? t('Search menu or type custom item')
                    : t('e.g. 2 Meat Fiteer, 1 Pepsi')
                }
                className="w-full rounded-xl border border-iti-100 bg-stone-50 py-2.5 ps-9 pe-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-iti-red focus:outline-none focus:ring-2 focus:ring-iti-red/30 transition"
              />
              {showSuggestions && customItem.trim() && selectedRestaurant && (
                <ul
                  className="absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-iti-100 bg-white py-1 shadow-lg shadow-iti-red/10"
                  role="listbox"
                >
                  {searchSuggestions.length > 0 ? (
                    searchSuggestions.map((menuItem, index) => {
                      const label = menuItemLabel(menuItem, t, i18n.language);
                      const priceLabel =
                        menuItem.price > 0
                          ? `${menuItem.price} ${isArabic(i18n.language) ? 'ج' : 'EGP'}`
                          : '—';
                      return (
                        <li key={menuItem.id} role="option" aria-selected={index === activeSuggestion}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveSuggestion(index)}
                            onClick={() => selectMenuSuggestion(menuItem)}
                            className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-start text-sm transition ${
                              index === activeSuggestion
                                ? 'bg-iti-50 text-iti-red-dark'
                                : 'text-gray-800 hover:bg-iti-50/60'
                            }`}
                          >
                            <span className="min-w-0 flex-1 font-medium leading-snug">{label}</span>
                            <span className="shrink-0 text-xs font-bold text-iti-red">{priceLabel}</span>
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-3 py-2.5 text-sm text-gray-500">{t('No menu matches')}</li>
                  )}
                </ul>
              )}
            </div>
            <button
              type="button"
              onClick={handleAddCustomItem}
              disabled={!customItem.trim()}
              className="flex-shrink-0 inline-flex items-center gap-1 rounded-xl border-2 border-iti-red bg-white px-4 py-2.5 text-sm font-bold text-iti-red hover:bg-iti-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              {t("Add")}
            </button>
          </div>
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
            {!orderTotals.hasParsedPrices && orderLines.length > 0 && (
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
