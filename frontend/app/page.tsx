"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


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
  const router = useRouter();
const [checkingAuth, setCheckingAuth] =
  useState(true);
  const [zones, setZones] = useState<HostedZone[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [editingZoneId, setEditingZoneId] =
  useState<number | null>(null);

const [editZoneName, setEditZoneName] =
  useState("");

const [editZoneComment, setEditZoneComment] =
  useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem("orion-auth");
  router.push("/login");
};

  const [notification, setNotification] =
    useState<{
      type: "success" | "error";
      message: string;
    } | null>(null);

  const [lastUpdated, setLastUpdated] =
    useState("");

    const [dashboardStats, setDashboardStats] =
  useState({
    hosted_zones: 0,
    dns_records: 0,
    health_checks: 0,
    healthy_checks: 0,
    unhealthy_checks: 0,
  });

  const [zoneFilter, setZoneFilter] =
  useState("all");

const filteredZones = zones.filter(
  (zone) => {
    const matchesSearch =
      zone.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesFilter =
      zoneFilter === "all"
        ? true
        : zoneFilter === "with-records"
        ? zone.record_count > 0
        : zone.record_count === 0;

    return (
      matchesSearch &&
      matchesFilter
    );
  }
);

const [currentPage, setCurrentPage] =
  useState(1);

const itemsPerPage = 5;

const totalPages = Math.ceil(
  filteredZones.length / itemsPerPage
);

const paginatedZones =
  filteredZones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalRecords = zones.reduce(
    (sum, zone) => sum + zone.record_count,
    0
  );

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

  const fetchZones = async () => {
  try {
    const res = await api.get("/hosted-zones/");

    setZones(res.data);

    setLastUpdated(
      new Date().toLocaleTimeString()
    );
  } 
  
  catch (error: any) {
  console.error(error);

  if (error.code === "ERR_NETWORK") {
    showNotification(
      "error",
      "Backend server unavailable"
    );
  } else if (error.response?.status === 400) {
    showNotification(
      "error",
      error.response?.data?.detail ||
        "Hosted zone already exists"
    );
  } else {
    showNotification(
      "error",
      "Failed to create hosted zone"
    );
  }
}
};
const fetchDashboardStats = async () => {
  try {
    const res = await api.get(
      "/dashboard/stats"
    );

    setDashboardStats(
      res.data
    );
  } catch (error) {
    console.error(error);
  }
};

 useEffect(() => {
  const auth = localStorage.getItem("orion-auth");

  if (!auth) {
    router.push("/login");
    return;
  }

  const loadData = async () => {
    try {
      await fetchZones();
      await fetchDashboardStats();
    } catch (error) {
      console.error(error);
    } finally {
      setCheckingAuth(false);
    }
  };

  loadData();
}, []);

  const createZone = async () => {
    if (!name.trim()) {
      showNotification(
        "error",
        "Domain name is required"
      );
      return;
    }

    const domainRegex =
      /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!domainRegex.test(name)) {
      showNotification(
        "error",
        "Please enter a valid domain"
      );
      return;
    }

    try {
      setLoading(true);

      await api.post("/hosted-zones/", {
        name,
        comment,
      });

      setName("");
      setComment("");

      await fetchZones();

      showNotification(
        "success",
        "Hosted Zone created successfully"
      );
    } catch (error) {
      console.error(error);

      showNotification(
        "error",
        "Failed to create hosted zone"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteZone = async (
    id: number,
    domain: string
  ) => {
    const confirmed = window.confirm(
      `Delete hosted zone "${domain}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/hosted-zones/${id}`
      );

      await fetchZones();

      showNotification(
        "success",
        `${domain} deleted successfully`
      );
    } catch (error) {
      console.error(error);

      showNotification(
        "error",
        "Failed to delete hosted zone"
      );
    }
  };

  const startEditZone = (
  zone: HostedZone
) => {
  setEditingZoneId(zone.id);

  setEditZoneName(zone.name);

  setEditZoneComment(
    zone.comment || ""
  );
};

const updateZone = async () => {
  try {
    await api.put(
      `/hosted-zones/${editingZoneId}`,
      {
        name: editZoneName,
        comment: editZoneComment,
      }
    );

    setEditingZoneId(null);

    await fetchZones();

    showNotification(
      "success",
      "Hosted Zone updated successfully"
    );
  } catch (error) {
    console.error(error);

    showNotification(
      "error",
      "Failed to update Hosted Zone"
    );
  }
};

  if (checkingAuth) {
  return (
    <div className="flex min-h-screen items-center justify-center">
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-2">
      Orion DNS
    </h2>

    <p className="text-lg">
      Initializing Services...
    </p>

    <p className="text-sm text-gray-500 mt-2">
      The backend may take a few seconds to wake up after inactivity.
    </p>
  </div>
</div>
  );
}

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors">
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-slate-900 text-white">
  <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
    
    <h1 className="text-2xl font-bold">
      Orion DNS Manager
    </h1>

    <div className="flex items-center gap-4">
      <div className="text-sm text-slate-300">
        AWS Route53 Clone
      </div>

      <ThemeToggle />

      <Button
        variant="destructive"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>

  </div>
</div>

        <div className="max-w-7xl mx-auto px-8 py-8 text-slate-900 dark:text-white">
          <div className="text-sm text-slate-400 mb-4">
  AWS Route53 / Hosted Zones
</div>

          {/* Notifications */}
          {notification && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-white font-medium shadow-md ${
                notification.type ===
                "success"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {notification.message}
            </div>
          )}
          {editingZoneId && (
  <Card
  className="
    mb-6
    bg-white
    dark:bg-slate-900
    dark:border-slate-800
  "
>
    <CardContent className="p-6 space-y-4">
     <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Edit Hosted Zone
      </h3>

      <Input
  className="
    bg-white
    dark:bg-slate-800
    dark:border-slate-700
    dark:text-white
  "
  value={editZoneName}
  onChange={(e) =>
    setEditZoneName(
      e.target.value
    )
  }
/>
      <Input
  className="
    bg-white
    dark:bg-slate-800
    dark:border-slate-700
    dark:text-white
  "
  value={editZoneComment}
  onChange={(e) =>
    setEditZoneComment(
      e.target.value
    )
  }
/>
      <div className="flex gap-2">
        <Button
          onClick={updateZone}
        >
          Save Changes
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            setEditingZoneId(null)
          }
        >
          Cancel
        </Button>
      </div>
    </CardContent>
  </Card>
)}

          {/* Hero */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 mb-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-2">
             Hosted Zones Dashboard
            </h2>

            <p className="text-blue-100">
              Manage DNS routing, records, and hosted zones with Route53-inspired controls.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
           <Card
  className="
    shadow-md
    bg-white
    dark:bg-slate-900
    dark:border-slate-700
    transition-all
    hover:shadow-xl
    hover:-translate-y-1
  "
>
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">
                  Hosted Zones
                </p>

                <h3 className="text-4xl font-bold mt-2">
                  {zones.length}
                </h3>
              </CardContent>
            </Card>

            <Card
  className="
    shadow-md
    bg-white
    dark:bg-slate-900
    dark:border-slate-700
    transition-all
    hover:shadow-xl
    hover:-translate-y-1
  "
>
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">
                  DNS Records
                </p>

                <h3 className="text-4xl font-bold mt-2">
                  {totalRecords}
                </h3>
              </CardContent>
            </Card>

            <Card
  className="
    shadow-md
    bg-white
    dark:bg-slate-900
    dark:border-slate-700
    transition-all
    hover:shadow-xl
    hover:-translate-y-1
  "
>
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">
                  System Status
                </p>

                <h3 className="text-2xl font-bold mt-2 text-green-600">
                  Healthy
                </h3>
              </CardContent>
            </Card>

            <Card
  className="
    shadow-md
    bg-white
    dark:bg-slate-900
    dark:border-slate-700
    transition-all
    hover:shadow-xl
    hover:-translate-y-1
  "
>
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">
                  Last Updated
                </p>

                <h3 className="text-lg font-semibold mt-2">
                  {lastUpdated}
                </h3>
              </CardContent>
            </Card>
          </div>

          {/* Create Hosted Zone */}
          <Card
  className="
    shadow-md
    mb-8
    bg-white
    dark:bg-slate-900
    dark:border-slate-800
    transition-colors
  "
>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-5 text-slate-900 dark:text-white">
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

                <Button
  onClick={createZone}
  disabled={loading}
  className="
    bg-orange-500
    hover:bg-orange-600
    text-white
  "
>
                  {loading
                    ? "Creating..."
                    : "Create Hosted Zone"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hosted Zones */}
          <Card
  className="
    shadow-md
    bg-white
    dark:bg-slate-900
    dark:border-slate-800
    transition-colors
  "
>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-5">

  <div className="flex items-center gap-3">

    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
      Hosted Zones
    </h3>

    <span
  className="
    bg-blue-100
    text-blue-700
    dark:bg-blue-900
    dark:text-blue-200
    px-3 py-1
    rounded-full
    text-xs
  "
>
      {filteredZones.length}
    </span>

    <Button
      variant="outline"
      size="sm"
      onClick={fetchZones}
    >
      Refresh
    </Button>

  </div>

  <div className="flex gap-3">

    <select
  className="border rounded-lg px-3 py-2"
  value={zoneFilter}
  onChange={(e) =>
    setZoneFilter(
      e.target.value
    )
  }
>
  <option value="all">
    All Zones
  </option>

  <option value="with-records">
    Zones With Records
  </option>

  <option value="empty">
    Empty Zones
  </option>
</select>
    <input
      type="text"
      placeholder="🔍 Search domains..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

  </div>

</div>

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
                  {filteredZones.length ===
                  0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-10 text-gray-500"
                      >
                        No hosted zones found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedZones.map((zone) => (
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
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            ● Active
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
  variant="outline"
  onClick={() => {
    setEditingZoneId(zone.id);
    setEditZoneName(zone.name);
    setEditZoneComment(zone.comment || "");
  }}
>
  Edit
</Button>
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Hosted Zone?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              deleteZone(zone.id, zone.name)
            }
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  </div>
</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <div className="flex justify-center gap-4 mt-6">

  <Button
    variant="outline"
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(
        currentPage - 1
      )
    }
  >
    Previous
  </Button>

  <span className="flex items-center">
    Page {currentPage} of {totalPages}
  </span>

  <Button
    variant="outline"
    disabled={
      currentPage === totalPages
    }
    onClick={() =>
      setCurrentPage(
        currentPage + 1
      )
    }
  >
    Next
  </Button>

</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}