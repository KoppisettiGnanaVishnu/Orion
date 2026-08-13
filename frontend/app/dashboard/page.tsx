import Sidebar from "@/components/Sidebar";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Coming Soon
          </h1>

          <p className="text-slate-500">
            This Route53 feature is under development.
          </p>
        </div>
      </div>
    </div>
  );
}