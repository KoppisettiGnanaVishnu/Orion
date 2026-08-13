"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";

import { Button } from "@/components/ui/button";
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

  const [zone, setZone] =
    useState<HostedZone | null>(null);

  const [records, setRecords] =
    useState<DNSRecord[]>([]);

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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchZone();
    fetchRecords();
  }, []);

  const createRecord = async () => {
    try {
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

      fetchRecords();
      fetchZone();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRecord = async (
    recordId: number
  ) => {
    try {
      await api.delete(
        `/records/${recordId}`
      );

      fetchRecords();
      fetchZone();
    } catch (err) {
      console.error(err);
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

      fetchRecords();
      fetchZone();
    } catch (err) {
      console.error(err);
    }
  };

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
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between">

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

          <Card className="mb-6">
            <CardContent className="p-6">

              <h2 className="text-4xl font-bold">
                {zone.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {zone.comment}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

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

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>

              </div>

            </CardContent>
          </Card>

          {/* Create Record */}

          <Card className="mb-6">
            <CardContent className="p-6">

              <h3 className="text-2xl font-semibold mb-5">
                Create DNS Record
              </h3>

              <div className="grid md:grid-cols-4 gap-4">

                <input
                  className="border rounded-lg p-3"
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
                  <option>CNAME</option>
                  <option>MX</option>
                  <option>TXT</option>
                </select>

                <input
                  className="border rounded-lg p-3"
                  placeholder="1.1.1.1"
                  value={recordValue}
                  onChange={(e) =>
                    setRecordValue(
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="border rounded-lg p-3"
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
                onClick={createRecord}
              >
                Create Record
              </Button>

            </CardContent>
          </Card>

          {/* Edit Record */}

          {editingId && (
            <Card className="mb-6">
              <CardContent className="p-6">

                <h3 className="text-2xl font-semibold mb-5">
                  Edit DNS Record
                </h3>

                <div className="grid md:grid-cols-4 gap-4">

                  <input
                    className="border rounded-lg p-3"
                    value={editName}
                    onChange={(e) =>
                      setEditName(
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="border rounded-lg p-3"
                    value={editType}
                    onChange={(e) =>
                      setEditType(
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="border rounded-lg p-3"
                    value={editValue}
                    onChange={(e) =>
                      setEditValue(
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="number"
                    className="border rounded-lg p-3"
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

          {/* DNS Records Table */}

          <Card>
            <CardContent className="p-6">

              <h3 className="text-2xl font-semibold mb-5">
                DNS Records
              </h3>

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
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {records.map(
                    (record) => (
                      <tr
                        key={record.id}
                        className="border-b"
                      >
                        <td className="p-3">
                          {record.name}
                        </td>

                        <td className="p-3">
                          {record.type}
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
                                record.id
                              )
                            }
                          >
                            Delete
                          </Button>

                        </td>
                      </tr>
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