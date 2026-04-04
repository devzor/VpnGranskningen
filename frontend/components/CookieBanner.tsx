"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 text-white px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
      <p className="text-sm text-gray-300 text-center sm:text-left">
        Vi använder cookies för analys och förbättrad användarupplevelse.
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-white text-gray-900 font-semibold text-sm rounded-xl px-6 py-2.5 hover:bg-gray-200 transition-colors"
      >
        Okej!
      </button>
    </div>
  );
}
