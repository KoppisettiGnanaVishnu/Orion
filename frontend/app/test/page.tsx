"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function TestPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api
      .get("/hosted-zones/")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Backend Connection Test
      </h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}