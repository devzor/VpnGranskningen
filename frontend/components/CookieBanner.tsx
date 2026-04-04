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
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 text-white shadow-2xl border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-5 py-5 flex flex-col gap-4">
        <div>
          <p className="font-semibold text-white mb-1">Kakor för analys</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Den här webbplatsen använder icke-nödvändiga kakor från{" "}
            <strong className="text-white">Microsoft Clarity</strong> för att samla in statistik
            om hur besökare använder sidan. Det inkluderar värmekartor, inspelningar av
            sidvisningar och klickbeteende. Du kan när som helst ändra eller dra tillbaka
            ditt samtycke.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-200 transition-colors"
          >
            Visa mer om Microsoft Clarity
          </a>
          <div className="flex gap-3 sm:ml-auto flex-wrap">
            <button
              onClick={reject}
              className="text-sm text-gray-400 border border-gray-600 rounded-xl px-5 py-2 hover:border-gray-400 hover:text-white transition-colors"
            >
              Avvisa alla icke-nödvändiga kakor
            </button>
            <button
              onClick={accept}
              className="text-sm font-semibold bg-white text-gray-900 rounded-xl px-6 py-2 hover:bg-gray-200 transition-colors"
            >
              Acceptera analyskakor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
