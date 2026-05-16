import { UtensilsCrossed, MapPin, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const isAr = i18n.language.startsWith('ar');

  return (
    <header
      dir={isAr ? 'rtl' : 'ltr'}
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/Gemini_Generated_Image_6kprj26kprj26kpr.png"
            alt={t("ITI Aswan Food Hub")}
            className="h-12 w-auto sm:h-14 object-contain object-start flex-shrink-0 rounded-xl"
            decoding="async"
          />
          <div className="leading-tight text-start">
            <h1 className="font-black text-gray-900 text-lg tracking-tight">
              {t("ITI Aswan Food Hub")}
            </h1>
            <p className="text-xs text-gray-600 font-medium hidden sm:block">{t("مركز طلبات الطعام – ITI أسوان")}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-600 pointer-events-none select-none">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-iti-red shrink-0" strokeWidth={2.25} />
              <span className="font-medium">{t("Aswan Branch")}</span>
            </span>
            <span className="h-3 w-px bg-gray-300" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <UtensilsCrossed size={13} className="text-iti-red shrink-0" strokeWidth={2.25} />
              <span className="font-medium">{t("Group Orders")}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-iti-50/60 border border-iti-100 rounded-xl px-3 py-2 hover:bg-iti-100/80 transition text-iti-red-dark font-semibold"
            title={t("Language")}
          >
            <Languages size={13} />
            <span className="text-xs uppercase">{i18n.language === 'en' ? 'ع' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

