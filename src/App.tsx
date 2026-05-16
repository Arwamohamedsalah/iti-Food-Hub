import { useState } from 'react';
import Navbar from './components/Navbar';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';
import SessionManager from './components/SessionManager';
import { useTranslation } from 'react-i18next';
import { defaultSessionId } from './lib/sessionId';

const DEFAULT_SESSION = defaultSessionId();

export default function App() {
  const { t } = useTranslation();
  const [sessionId, setSessionId] = useState(DEFAULT_SESSION);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOrderPlaced = () => {
    setRefreshTrigger(t => t + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-iti-red to-iti-red-dark text-white py-6 sm:py-8 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">
            {t("منصة طلبات مجموعات ITI أسوان")}
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t("Group Order Manager — choose a restaurant, submit your order, and keep everyone in sync.")}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Session Manager */}
        <SessionManager sessionId={sessionId} onSessionChange={setSessionId} />

        {/* Two-column layout on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <OrderForm sessionId={sessionId} onOrderPlaced={handleOrderPlaced} />
          </div>
          <div className="space-y-6 lg:sticky lg:top-24">
            <OrderSummary sessionId={sessionId} refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      <footer className="text-center py-8 px-4 mt-12 border-t border-gray-200 bg-gray-50">
        <h3 className="font-black text-gray-900 text-lg mb-1">{t("ITI Aswan Food Hub")}</h3>
        <p className="text-sm text-gray-600">{t("Built for ITI Aswan Branch students — تم تصميمه لطلبة أسوان")}</p>
      </footer>
    </div>
  );
}

