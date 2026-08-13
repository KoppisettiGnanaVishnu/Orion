export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h2 className="text-xl font-bold mb-8">
        Orion DNS
      </h2>

      <div className="space-y-2">

        <div className="bg-orange-500 text-white px-4 py-3 rounded">
          Dashboard
        </div>

        <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer">
          Hosted Zones
        </div>

        <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer">
          DNS Records
        </div>

        <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer">
          Health Checks
        </div>

        <div className="px-4 py-3 hover:bg-slate-800 rounded cursor-pointer">
          Settings
        </div>

      </div>
    </div>
  );
}