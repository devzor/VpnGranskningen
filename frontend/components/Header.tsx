import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900 tracking-tight hover:text-gray-600 transition-colors">
          VpnGranskningen
        </Link>
        <nav className="hidden sm:flex gap-6 text-sm text-gray-500">
          <Link href="/vad-ar-vpn" className="hover:text-gray-900 transition-colors">Vad är en VPN?</Link>
          <a href="#" className="hover:text-gray-900 transition-colors">Jämför alla</a>
          <Link href="/om-sajten" className="hover:text-gray-900 transition-colors">Om sajten</Link>
        </nav>
      </div>
    </header>
  );
}
