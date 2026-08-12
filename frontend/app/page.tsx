"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
};

export default function Home() {
  const [zones, setZones] = useState<HostedZone[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

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
      alert("Failed to create hosted zone");
    }
  };

  const deleteZone = async (id: number) => {
    try {
      await api.delete(`/hosted-zones/${id}`);
      fetchZones();
    } catch (error) {
      console.error(error);
      alert("Failed to delete hosted zone");
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">
        Orion DNS Manager
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Hosted Zone</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <input
            className="border rounded-md p-2 w-full"
            placeholder="Domain Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border rounded-md p-2 w-full"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button onClick={createZone}>
            Create Zone
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Hosted Zones</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain Name</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {zones.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center"
                  >
                    No hosted zones found
                  </TableCell>
                </TableRow>
              ) : (
                zones.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">
                      {zone.name}
                    </TableCell>

                    <TableCell>
                      {zone.comment}
                    </TableCell>

                    <TableCell>
                      0
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
      onClick={() => deleteZone(zone.id)}
    >
      Delete
    </Button>
  </div>
</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}