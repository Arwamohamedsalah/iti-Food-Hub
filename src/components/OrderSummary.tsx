import { useEffect, useState, useCallback } from 'react';
import { BarChart2, Trash2, RefreshCw, Users, ChevronDown, ChevronUp, Activity } from 'lucide-react';
import { supabase, Order } from '../lib/supabase';
import { RESTAURANTS } from '../data/constants';
import { useTranslation } from 'react-i18next';
import { formatEgp, getOrderTotals } from '../lib/orderTotals';
import { dateLocale, restaurantNameFromStored } from '../lib/locale';

interface Props {
  sessionId: string;
  refreshTrigger: number;
}

interface RestaurantGroup {
  restaurant: string;
  orders: Order[];
  itemCounts: Record<string, number>;
}

function parseItems(items: string): string[] {
  return items
    .split(',')
    .map(i => i.trim())
    .filter(Boolean);
}

function groupByRestaurant(orders: Order[]): RestaurantGroup[] {
  const map: Record<string, Order[]> = {};
  for (const order of orders) {
    if (!map[order.restaurant]) map[order.restaurant] = [];
    map[order.restaurant].push(order);
  }

  return Object.entries(map).map(([restaurant, orders]) => {
    const itemCounts: Record<string, number> = {};
    for (const order of orders) {
      for (const item of parseItems(order.items)) {
        const normalized = item.toLowerCase().replace(/^\d+\s*x?\s*/i, '').trim();
        const qty = parseInt(item.match(/^(\d+)/)?.[1] ?? '1', 10);
        if (!itemCounts[normalized]) itemCounts[normalized] = 0;
        itemCounts[normalized] += qty;
      }
    }
    return { restaurant, orders, itemCounts };
  });
}

const trackColors: Record<string, string> = {
  '9 Month .NET': 'bg-blue-100 text-blue-900 border-blue-200',
  'UI/UX': 'bg-cyan-100 text-cyan-900 border-cyan-200',
  '2D Graphics': 'bg-rose-100 text-rose-900 border-rose-200',
  'Frontend & Cross-Platform Mobile Application':
    'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200',
  'Social Media Marketing': 'bg-indigo-100 text-indigo-900 border-indigo-200',
  'Software Engineering Fundamentals': 'bg-amber-100 text-amber-900 border-amber-200',
  'Full Stack Web Development - MEARN': 'bg-emerald-100 text-emerald-900 border-emerald-200',
};

function resolveDeliveryFee(order: Order): number {
  return typeof order.delivery_fee === 'number' ? order.delivery_fee : 0;
}

export default function OrderSummary({ sessionId, refreshTrigger }: Props) {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRestaurant, setExpandedRestaurant] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false }); // Most recent first for feed style
    setOrders(data ?? []);
    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, refreshTrigger]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchOrders]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await supabase.from('orders').delete().eq('id', id);
    setDeletingId(null);
    fetchOrders();
  };

  const groups = groupByRestaurant(orders);

  const sessionBilling = orders.reduce(
    (acc, order) => {
      const delivery = resolveDeliveryFee(order);
      const { foodSubtotal, total } = getOrderTotals(order.items, delivery);
      acc.food += foodSubtotal;
      acc.delivery += delivery;
      acc.total += total;
      return acc;
    },
    { food: 0, delivery: 0, total: 0 },
  );

  const restaurantBilling = groups.map(g => {
    let food = 0;
    let delivery = 0;
    for (const order of g.orders) {
      const d = resolveDeliveryFee(order);
      const totals = getOrderTotals(order.items, d);
      food += totals.foodSubtotal;
      delivery += d;
    }
    return { restaurant: g.restaurant, food, delivery, total: food + delivery, orders: g.orders.length };
  });

  const getRestaurantEmoji = (name: string) => {
    return RESTAURANTS.find(r => r.name === name)?.emoji ?? '🍽️';
  };

  const getTrackColor = (track: string) => {
    return trackColors[track as keyof typeof trackColors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-iti-100 overflow-hidden shadow-xl shadow-iti-red/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-iti-red to-iti-red-dark px-5 py-4 flex items-center justify-between border-b border-white/10">
        <div>
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Activity size={18} className="text-white/95" />
            {t("Live Order Feed")}
          </h2>
          <p className="text-white/85 text-xs mt-0.5">{t("Real-time group orders")}</p>
        </div>
        <button
          onClick={fetchOrders}
          className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition border border-white/25"
          title={t("Refresh")}
        >
          <RefreshCw size={15} className={`text-white ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 divide-x divide-red-100 bg-iti-50/70 border-b border-iti-100">
        <div className="px-4 py-3 text-center">
          <div className="text-xl font-black text-iti-red">{orders.length}</div>
          <div className="text-xs text-gray-600 font-medium">{t("Total Orders")}</div>
        </div>
        <div className="px-4 py-3 text-center">
          <div className="text-xl font-black text-iti-red">{groups.length}</div>
          <div className="text-xs text-gray-600 font-medium">{t("Restaurants")}</div>
        </div>
        <div className="px-4 py-3 text-center">
          <div className="text-xl font-black text-iti-red">
            {[...new Set(orders.map(o => o.track))].length}
          </div>
          <div className="text-xs text-gray-600 font-medium">{t("Tracks")}</div>
        </div>
      </div>

      {orders.length > 0 && (
        <div className="border-b border-iti-100 bg-white px-4 py-4 space-y-3">
          <p className="text-sm font-bold text-iti-red-dark">{t("Session billing")}</p>
          {restaurantBilling.map(row => (
            <div key={row.restaurant} className="rounded-xl border border-iti-100 bg-iti-50/40 px-3 py-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-gray-900 mb-1">
                <span>{getRestaurantEmoji(row.restaurant)}</span>
                <span>{restaurantNameFromStored(row.restaurant, t, i18n.language)}</span>
                <span className="text-gray-500">({row.orders} {t("orders")})</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t("Food subtotal")}</span>
                <span>{formatEgp(row.food, i18n.language)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t("Delivery fees")}</span>
                <span>{formatEgp(row.delivery, i18n.language)}</span>
              </div>
              <div className="flex justify-between font-bold text-iti-red mt-1 pt-1 border-t border-iti-100">
                <span>{t("Subtotal")}</span>
                <span>{formatEgp(row.total, i18n.language)}</span>
              </div>
            </div>
          ))}
          <div className="rounded-xl border-2 border-iti-red/30 bg-iti-50/60 px-4 py-3 text-sm space-y-1">
            <div className="flex justify-between text-gray-700">
              <span>{t("Food subtotal")}</span>
              <span className="font-semibold">{formatEgp(sessionBilling.food, i18n.language)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{t("Delivery fees")}</span>
              <span className="font-semibold">{formatEgp(sessionBilling.delivery, i18n.language)}</span>
            </div>
            <div className="flex justify-between text-iti-red font-black text-base pt-2 border-t border-iti-200">
              <span>{t("Grand total")}</span>
              <span>{formatEgp(sessionBilling.total, i18n.language)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-3 max-h-96 overflow-y-auto bg-gradient-to-b from-iti-50/30 to-white">
        {loading && orders.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <div className="w-8 h-8 border-2 border-iti-100 border-t-iti-red rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">{t("Loading live feed...")}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">📡</div>
            <p className="text-gray-600 font-semibold text-sm">{t("No orders yet")}</p>
            <p className="text-gray-500 text-xs mt-1">{t("Orders will appear here in real-time!")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-iti-100 p-4 hover:bg-iti-50/40 transition-all duration-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-iti-red to-iti-red-dark flex items-center justify-center flex-shrink-0 shadow-md shadow-iti-red/25">
                    <span className="text-white text-sm font-black">
                      {order.student_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-semibold text-gray-900 text-sm">{order.student_name}</span>
                      <span className={`text-xs font-medium rounded-full px-2 py-0.5 border ${getTrackColor(order.track)}`}>
                        {t(order.track)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getRestaurantEmoji(order.restaurant)}</span>
                      <span className="text-sm text-gray-800 font-medium">
                        {restaurantNameFromStored(order.restaurant, t, i18n.language)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{order.items}</p>
                    {(() => {
                      const delivery = resolveDeliveryFee(order);
                      const totals = getOrderTotals(order.items, delivery);
                      return (
                        <div className="text-xs rounded-lg bg-iti-50/60 border border-iti-100 px-2.5 py-2 mb-2 space-y-0.5">
                          <div className="flex justify-between text-gray-600">
                            <span>{t("Food subtotal")}</span>
                            <span>{totals.hasParsedPrices ? formatEgp(totals.foodSubtotal, i18n.language) : '—'}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>{t("Delivery fee")}</span>
                            <span>{formatEgp(totals.deliveryFee, i18n.language)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-iti-red">
                            <span>{t("Total")}</span>
                            <span>{formatEgp(totals.total, i18n.language)}</span>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleString(dateLocale(i18n.language), {
                          hour: '2-digit',
                          minute: '2-digit',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <button
                        onClick={() => handleDelete(order.id)}
                        disabled={deletingId === order.id}
                        className="p-1.5 rounded-lg hover:bg-iti-100 text-gray-500 hover:text-iti-red transition flex-shrink-0"
                        title={t("Remove order")}
                      >
                        {deletingId === order.id ? (
                          <div className="w-3.5 h-3.5 border border-iti-red border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


