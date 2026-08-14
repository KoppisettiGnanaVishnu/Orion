import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#071329] text-white p-6">
      <h2 className="text-xl font-bold mb-8">
        Orion DNS
      </h2>

      <nav className="space-y-2">
  <Link href="/dashboard">
    <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer transition">
      Dashboard
    </div>
  </Link>

  <Link href="/">
    <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer transition">
      Hosted Zones
    </div>
  </Link>

  <Link href="/traffic-policies">
    <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer transition">
      Traffic Policies
    </div>
  </Link>

  <Link href="/health-checks">
    <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer transition">
      Health Checks
    </div>
  </Link>

  <Link href="/resolver">
    <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer transition">
      Resolver
    </div>
  </Link>

  <Link href="/profiles">
    <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer transition">
      Profiles
    </div>
  </Link>
</nav>
    </aside>
  );
}