"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DNSRecord = {
  id: number;
  zone_id: number;
  name: string;
  type: string;
  value: string;
  ttl: number;
};

export default function ZonePage() {
  const params = useParams();

  const zoneId = params.id;

  const [records, setRecords] = useState<DNSRecord[]>([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("A");
  const [value, setValue] = useState("");
  const [ttl, setTTL] = useState(300);

  const fetchRecords = async () => {
    try {
      const res = await api.get(
        `/records/zone/${zoneId}`
      );

      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const createRecord = async () => {
    if (!name || !value) return;

    try {
      await api.post(
        `/records/${zoneId}`,
        {
          name,
          type,
          value,
          ttl,
        }
      );

      setName("");
      setValue("");
      setTTL(300);

      fetchRecords();
    } catch (error) {
      console.error(error);
      alert("Failed to create record");
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
    } catch (error) {
      console.error(error);
      alert("Failed to delete record");
    }
  };

  return (
    <div className="container mx-auto max-w-6xl py-10 px-4">

      <h1 className="text-4xl font-bold mb-8">
        DNS Records
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>
            Add DNS Record
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="grid grid-cols-4 gap-4">

            <input
              className="border rounded-md p-2"
              placeholder="Record Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <select
              className="border rounded-md p-2"
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option>A</option>
              <option>AAAA</option>
              <option>CNAME</option>
              <option>MX</option>
              <option>TXT</option>
            </select>

            <input
              className="border rounded-md p-2"
              placeholder="Value"
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
            />

            <input
              type="number"
              className="border rounded-md p-2"
              placeholder="TTL"
              value={ttl}
              onChange={(e) =>
                setTTL(
                  Number(e.target.value)
                )
              }
            />

          </div>

          <Button
            className="mt-4"
            onClick={createRecord}
          >
            Add Record
          </Button>

        </CardContent>
      </Card>

      <Card className="mt-8">

        <CardHeader>
          <CardTitle>
            DNS Records
          </CardTitle>
        </CardHeader>

        <CardContent>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Type
                </th>

                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Value
                </th>

                <th className="text-left py-3">
                  TTL
                </th>

                <th className="text-left py-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {record.type}
                  </td>

                  <td>
                    {record.name}
                  </td>

                  <td>
                    {record.value}
                  </td>

                  <td>
                    {record.ttl}
                  </td>

                  <td>

                    <Button
                      variant="destructive"
                      size="sm"
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
              ))}

            </tbody>

          </table>

        </CardContent>

      </Card>

    </div>
  );
}