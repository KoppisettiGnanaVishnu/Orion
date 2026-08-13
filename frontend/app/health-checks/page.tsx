"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";

interface HealthCheck {
  id: number;
  url: string;
  status: string;
}

export default function HealthChecksPage() {
  const [url, setUrl] = useState("");
  const [checks, setChecks] = useState<HealthCheck[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChecks = async () => {
    try {
      const res = await api.get("/health-checks/");
      setChecks(res.data);
    } catch (error) {
      console.error("Failed to fetch health checks:", error);
    }
  };

  useEffect(() => {
    fetchChecks();
  }, []);

  const addCheck = async () => {
    if (!url.trim()) return;

    try {
      setLoading(true);

      await api.post("/health-checks/", {
        url,
      });

      setUrl("");
      await fetchChecks();
    } catch (error) {
      console.error("Failed to create health check:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCheck = async (id: number) => {
    try {
      await api.delete(`/health-checks/${id}`);
      await fetchChecks();
    } catch (error) {
      console.error("Failed to delete health check:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Health Checks
          </h1>

          <Card className="mb-6 shadow-md">
            <CardContent className="p-6 space-y-4">
              <input
                className="w-full border rounded-lg p-3"
                placeholder="https://google.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <Button
                onClick={addCheck}
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create Health Check"}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">
                      URL
                    </th>
                    <th className="text-left py-3">
                      Status
                    </th>
                    <th className="text-left py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {checks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-6 text-center text-gray-500"
                      >
                        No health checks found
                      </td>
                    </tr>
                  ) : (
                    checks.map((check) => (
                      <tr
                        key={check.id}
                        className="border-b"
                      >
                        <td className="py-4">
                          {check.url}
                        </td>

                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              check.status === "Healthy"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {check.status}
                          </span>
                        </td>

                        <td>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              deleteCheck(check.id)
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}