"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/vad-ar-vpn",    label: "Vad är en VPN?" },
  { href: "/#quiz",         label: "Jämför alla",     external: true },
  { href: "/recensioner",   label: "Våra recensioner" },
  { href: "/starlink-vpn",  label: "Starlink & VPN" },
  { href: "/om-sajten",     label: "Om sajten" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header ref={ref} className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white tracking-tight hover:text-gray-300 transition-colors"
        >
          <Image
            src="/logos/logo.jpg"
            alt="VpnGranskningen logotyp"
            width={32}
            height={32}
            className="rounded"
          />
          VpnGranskningen.se
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6 text-sm text-gray-400">
          {navLinks.map(({ href, label, external }) =>
            external ? (
              <a key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className="hover:text-white transition-colors">
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Hamburger button – mobile only */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="sm:hidden border-t border-gray-800 px-6 py-4 flex flex-col gap-4 text-sm text-gray-400">
          {navLinks.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                href={href}
                className="hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
