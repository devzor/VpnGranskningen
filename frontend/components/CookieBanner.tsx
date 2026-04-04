"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 text-white border-t border-gray-800 shadow-2xl">
      <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          Webbplatsen använder cookies. Genom att använda den godkänner du att de används.{" "}
          <Link
            href="/cookiepolicy"
            className="underline underline-offset-2 hover:text-white transition-colors"
            onClick={dismiss}
          >
            Mer information.
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 text-gray-400 hover:text-white text-xl leading-none px-2 transition-colors"
          aria-label="Stäng"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
