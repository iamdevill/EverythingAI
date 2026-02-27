'use client';

import { useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';

export default function CookieConsent() {
  const { cookieConsent, setCookieConsent } = useSettingsStore();
  const [isOpen, setIsOpen] = useState(!cookieConsent.hasConsented);

  if (!isOpen) return null;

  const handleAcceptAll = () => {
    setCookieConsent({ analytics: true, marketing: true });
    setIsOpen(false);
  };

  const handleAcceptNecessary = () => {
    setCookieConsent({ analytics: false, marketing: false });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900">Cookie Settings</h3>
              <p className="text-sm text-gray-600 mt-1">
                We use cookies to enhance your shopping experience. By continuing to visit this site you agree to our use of cookies.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={handleAcceptNecessary}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Necessary Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
