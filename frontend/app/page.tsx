"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type HostedZone = {
  id: number;
  name: string;
  comment: string;
  record_count: number;
};

export default function Home() {
  const [zones, setZones] = useState<HostedZone[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");

const filteredZones = zones.filter((zone) =>
  zone.name.toLowerCase().includes(
    search.toLowerCase()
  )
);

  const totalRecords = zones.reduce(
    (sum, zone) => sum + zone.record_count,
    0
  );

  const fetchZones = async () => {
    try {
      const res = await api.get("/hosted-zones/");
      setZones(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const createZone = async () => {
    if (!name.trim()) return;

    try {
      await api.post("/hosted-zones/", {
        name,
        comment,
      });

      setName("");
      setComment("");

      fetchZones();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteZone = async (id: number) => {
    try {
      await api.delete(`/hosted-zones/${id}`);
      fetchZones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="flex bg-slate-50">
    <Sidebar />

    <div className="flex-1">

      {/* Top Header */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Orion DNS Manager
          </h1>

          <div className="text-sm text-slate-300">
            AWS Route53 Clone
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="text-sm text-slate-500 mb-4">
  Route53 / Hosted Zones
</div>

        {/* Hero Section */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-2">
            DNS Management Dashboard
          </h2>

          <p className="text-blue-100">
            Manage Hosted Zones and DNS Records just like AWS Route53.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-gray-500 text-sm">
                Hosted Zones
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {zones.length}
              </h3>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-gray-500 text-sm">
                DNS Records
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {totalRecords}
              </h3>
            </CardContent>
          </Card>

          <Card className="shadow-md border-0">
            <CardContent className="p-6">
              <p className="text-gray-500 text-sm">
                System Status
              </p>

              <h3 className="text-2xl font-bold mt-2 text-green-600">
                Healthy
              </h3>
            </CardContent>
          </Card>

        </div>

        {/* Create Zone */}
        <Card className="shadow-md mb-8">
          <CardContent className="p-6">

            <h3 className="text-xl font-semibold mb-5">
              Create Hosted Zone
            </h3>

            <div className="space-y-4">

              <input
                className="w-full border rounded-lg p-3"
                placeholder="example.com"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                className="w-full border rounded-lg p-3"
                placeholder="Production DNS Zone"
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
              />

              <Button onClick={createZone}>
                Create Hosted Zone
              </Button>

            </div>

          </CardContent>
        </Card>

        {/* Hosted Zones Table */}
        <Card className="shadow-md">
          <CardContent className="p-6">

            <h3 className="text-xl font-semibold mb-5">
              Hosted Zones
            </h3>

            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {filteredZones.map((zone) => (
                  <TableRow
                    key={zone.id}
                    className="hover:bg-slate-50"
                  >
                    <TableCell className="font-medium">
                      {zone.name}
                    </TableCell>

                    <TableCell>
                      {zone.comment}
                    </TableCell>

                    <TableCell>
                      {zone.record_count}
                    </TableCell>

                    <TableCell>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        Active
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">

                        <Link href={`/zone/${zone.id}`}>
                          <Button variant="outline">
                            Manage
                          </Button>
                        </Link>

                        <Button
                          variant="destructive"
                          onClick={() =>
                            deleteZone(zone.id)
                          }
                        >
                          Delete
                        </Button>

                      </div>
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>

            </Table>

          </CardContent>
        </Card>

      </div>
    </div>
  </div>
);
}