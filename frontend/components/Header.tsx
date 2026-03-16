import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-white tracking-tight hover:text-gray-300 transition-colors">
          VpnGranskningen
        </Link>
        <nav className="hidden sm:flex gap-6 text-sm text-gray-400">
          <Link href="/vad-ar-vpn" className="hover:text-white transition-colors">Vad är en VPN?</Link>
          <Link href="/jamfor" className="hover:text-white transition-colors">Jämför alla</Link>
          <Link href="/om-sajten" className="hover:text-white transition-colors">Om sajten</Link>
        </nav>
      </div>
    </header>
  );
}
