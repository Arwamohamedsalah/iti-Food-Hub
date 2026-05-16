import { useEffect, useState } from 'react';
import { Hash, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  dateTimeLocalFromSessionId,
  sessionSlugFromDateTimeLocal,
  toDateTimeLocalValue,
} from '../lib/sessionId';

interface Props {
  sessionId: string;
  onSessionChange: (id: string) => void;
}

export default function SessionManager({ sessionId, onSessionChange }: Props) {
  const { t } = useTranslation();
  const [pickerValue, setPickerValue] = useState(() => dateTimeLocalFromSessionId(sessionId));

  useEffect(() => {
    setPickerValue(dateTimeLocalFromSessionId(sessionId));
  }, [sessionId]);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const applyPicker = () => {
    if (!pickerValue) return;
    onSessionChange(sessionSlugFromDateTimeLocal(pickerValue));
  };

  const applyNow = () => {
    const v = toDateTimeLocalValue(new Date());
    setPickerValue(v);
    onSessionChange(sessionSlugFromDateTimeLocal(v));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Hash size={18} className="text-iti-red" />
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">{t("Order Session")}</span>
        </div>
        <span className="text-xs text-gray-500">{today}</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="session-datetime" className="block text-xs font-semibold text-gray-600 mb-1.5">
            {t("Order date & time")}
          </label>
          <input
            id="session-datetime"
            type="datetime-local"
            value={pickerValue}
            onChange={e => setPickerValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyPicker()}
            className="w-full text-sm border border-gray-300 bg-white rounded-xl px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-iti-red focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={applyPicker}
            className="text-sm bg-iti-red text-white rounded-xl px-4 py-2.5 font-semibold hover:bg-iti-red-dark transition"
          >
            {t("Apply session")}
          </button>
          <button
            type="button"
            onClick={applyNow}
            title={t("Use now")}
            className="text-sm font-semibold rounded-xl px-4 py-2.5 border border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100 transition inline-flex items-center justify-center gap-1.5"
          >
            <Clock size={15} className="text-iti-red" />
            {t("Use now")}
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
        <span className="text-gray-600">
          {t("Active session:")} <span className="font-bold text-iti-red break-all">{sessionId}</span>
        </span>
      </div>
    </div>
  );
}
