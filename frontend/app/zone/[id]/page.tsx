"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";


import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type HostedZone = {
  id: number;
  name: string;
  comment: string;
  record_count: number;
};

type DNSRecord = {
  id: number;
  zone_id: number;
  name: string;
  type: string;
  value: string;
  ttl: number;
};

export default function ZoneDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [zone, setZone] =
    useState<HostedZone | null>(null);

  const [records, setRecords] =
    useState<DNSRecord[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [checkingAuth, setCheckingAuth] =
  useState(true);

  const [search, setSearch] =
    useState("");

  const [lastUpdated, setLastUpdated] =
    useState("");

  const [notification, setNotification] =
    useState<{
      type: "success" | "error";
      message: string;
    } | null>(null);

  const [recordName, setRecordName] =
    useState("");

  const [recordType, setRecordType] =
    useState("A");

  const [recordValue, setRecordValue] =
    useState("");

  const [recordTTL, setRecordTTL] =
    useState(300);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editType, setEditType] =
    useState("");

  const [editValue, setEditValue] =
    useState("");

  const [editTTL, setEditTTL] =
    useState(300);

  const showNotification = (
    type: "success" | "error",
    message: string
  ) => {
    setNotification({
      type,
      message,
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchZone = async () => {
    try {
      const res = await api.get(
        `/hosted-zones/${params.id}`
      );

      setZone(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await api.get(
        `/records/zone/${params.id}`
      );

      setRecords(res.data);

      setLastUpdated(
        new Date().toLocaleTimeString()
      );
    } catch (err: any) {
      console.error(err);

      showNotification(
        "error",
        "Failed to load DNS records"
      );
    }
  };

useEffect(() => {
  const auth =
    localStorage.getItem("orion-auth");

  if (!auth) {
    router.push("/login");
    return;
  }

  fetchZone();
  fetchRecords();

  setCheckingAuth(false);
}, [router]);

  const createRecord = async () => {
    if (!recordName.trim()) {
      showNotification(
        "error",
        "Record name is required"
      );
      return;
    }

    if (!recordValue.trim()) {
      showNotification(
        "error",
        "Record value is required"
      );
      return;
    }

    try {
      setLoading(true);

      await api.post(
        `/records/${params.id}`,
        {
          name: recordName,
          type: recordType,
          value: recordValue,
          ttl: recordTTL,
        }
      );

      setRecordName("");
      setRecordValue("");
      setRecordTTL(300);

      await fetchRecords();
      await fetchZone();

      showNotification(
        "success",
        "DNS Record created successfully"
      );
    } catch (err) {
      console.error(err);

      showNotification(
        "error",
        "Failed to create DNS record"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (
    recordId: number,
    recordName: string
  ) => {
    const confirmed = window.confirm(
      `Delete DNS Record "${recordName}" ?`
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/records/${recordId}`
      );

      await fetchRecords();
      await fetchZone();

      showNotification(
        "success",
        "Record deleted successfully"
      );
    } catch (err) {
      console.error(err);

      showNotification(
        "error",
        "Failed to delete record"
      );
    }
  };

  const startEdit = (
    record: DNSRecord
  ) => {
    setEditingId(record.id);
    setEditName(record.name);
    setEditType(record.type);
    setEditValue(record.value);
    setEditTTL(record.ttl);
  };

  const updateRecord = async () => {
    try {
      await api.put(
        `/records/${editingId}`,
        {
          name: editName,
          type: editType,
          value: editValue,
          ttl: editTTL,
        }
      );

      setEditingId(null);

      await fetchRecords();
      await fetchZone();

      showNotification(
        "success",
        "Record updated successfully"
      );
    } catch (err) {
      console.error(err);

      showNotification(
        "error",
        "Failed to update record"
      );
    }
  };

const filteredRecords =
  records.filter((record) =>
    record.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    record.type
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    record.value
      .toLowerCase()
      .includes(search.toLowerCase())
  );

if (checkingAuth) {
  return (
    <div className="p-10">
      Checking authentication...
    </div>
  );
}

if (!zone) {
  return (
    <div className="p-10">
      Loading...
    </div>
  );
}

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">

        <div className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold">
              Hosted Zone Details
            </h1>

            <div className="text-slate-300">
              Orion DNS
            </div>

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">

          <div className="text-sm text-slate-500 mb-4">
            Route53 / Hosted Zones / {zone.name}
          </div>

          {notification && (
            <Alert
              className={`mb-6 ${
                notification.type ===
                "success"
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              <AlertDescription>
                {notification.message}
              </AlertDescription>
            </Alert>
          )}

          <Card className="mb-8 shadow-md">
            <CardContent className="p-6">

              <h2 className="text-4xl font-bold">
                {zone.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {zone.comment}
              </p>

              <div className="grid md:grid-cols-4 gap-6 mt-6">

                <div>
                  <p className="text-gray-500">
                    Zone ID
                  </p>

                  <p className="font-bold">
                    {zone.id}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    DNS Records
                  </p>

                  <p className="font-bold">
                    {records.length}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Status
                  </p>

                  <Badge>
                    Active
                  </Badge>
                </div>

                <div>
                  <p className="text-gray-500">
                    Last Updated
                  </p>

                  <p className="font-bold">
                    {lastUpdated}
                  </p>
                </div>

              </div>

            </CardContent>
          </Card>

          <Card className="mb-8 shadow-md">
            <CardContent className="p-6">

              <h3 className="text-2xl font-semibold mb-5">
                Create DNS Record
              </h3>

              <div className="grid md:grid-cols-4 gap-4">

                <Input
                  placeholder="www"
                  value={recordName}
                  onChange={(e) =>
                    setRecordName(
                      e.target.value
                    )
                  }
                />

                <select
  className="border rounded-lg p-3"
  value={recordType}
  onChange={(e) =>
    setRecordType(
      e.target.value
    )
  }
>
  <option>A</option>
  <option>AAAA</option>
  <option>CNAME</option>
  <option>TXT</option>
  <option>MX</option>
  <option>NS</option>
  <option>PTR</option>
  <option>SRV</option>
  <option>CAA</option>
</select>

                <Input
                  placeholder="1.1.1.1"
                  value={recordValue}
                  onChange={(e) =>
                    setRecordValue(
                      e.target.value
                    )
                  }
                />

                <Input
                  type="number"
                  value={recordTTL}
                  onChange={(e) =>
                    setRecordTTL(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <Button
                className="mt-4"
                disabled={loading}
                onClick={createRecord}
              >
                {loading
                  ? "Creating..."
                  : "Create Record"}
              </Button>

            </CardContent>
          </Card>

          {editingId && (
            <Card className="mb-8 border-blue-500">
              <CardContent className="p-6">

                <h3 className="text-2xl font-semibold mb-5">
                  Edit DNS Record
                </h3>

                <div className="grid md:grid-cols-4 gap-4">

                  <Input
                    value={editName}
                    onChange={(e) =>
                      setEditName(
                        e.target.value
                      )
                    }
                  />

                  <Input
                    value={editType}
                    onChange={(e) =>
                      setEditType(
                        e.target.value
                      )
                    }
                  />

                  <Input
                    value={editValue}
                    onChange={(e) =>
                      setEditValue(
                        e.target.value
                      )
                    }
                  />

                  <Input
                    type="number"
                    value={editTTL}
                    onChange={(e) =>
                      setEditTTL(
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="flex gap-2 mt-4">

                  <Button
                    onClick={updateRecord}
                  >
                    Save Changes
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setEditingId(null)
                    }
                  >
                    Cancel
                  </Button>

                </div>

              </CardContent>
            </Card>
          )}

          <Card className="shadow-md">
            <CardContent className="p-6">

              <div className="flex justify-between items-center mb-5">

                <div className="flex items-center gap-3">

                  <h3 className="text-2xl font-semibold">
                    DNS Records
                  </h3>

                  <Badge>
                    {filteredRecords.length}
                  </Badge>

                </div>

                <Input
                  placeholder="Search records..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="w-72"
                />

              </div>

              <table className="w-full">

                <thead>
                  <tr className="border-b">

                    <th className="text-left p-3">
                      Name
                    </th>

                    <th className="text-left p-3">
                      Type
                    </th>

                    <th className="text-left p-3">
                      Value
                    </th>

                    <th className="text-left p-3">
                      TTL
                    </th>

                    <th className="text-left p-3">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredRecords.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        No DNS records found
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map(
                      (record) => (
                        <tr
                          key={record.id}
                          className="border-b hover:bg-slate-50"
                        >
                          <td className="p-3">
                            {record.name}
                          </td>

                          <td className="p-3">
                            <Badge variant="secondary">
                              {record.type}
                            </Badge>
                          </td>

                          <td className="p-3">
                            {record.value}
                          </td>

                          <td className="p-3">
                            {record.ttl}
                          </td>

                          <td className="p-3 flex gap-2">

                            <Button
                              variant="outline"
                              onClick={() =>
                                startEdit(
                                  record
                                )
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              variant="destructive"
                              onClick={() =>
                                deleteRecord(
                                  record.id,
                                  record.name
                                )
                              }
                            >
                              Delete
                            </Button>

                          </td>
                        </tr>
                      )
                    )
                  )}

                </tbody>

              </table>

            </CardContent>
          </Card>

          <Link href="/">
            <Button
              variant="outline"
              className="mt-6"
            >
              ← Back to Hosted Zones
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
}