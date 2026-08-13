"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = () => {
    console.log("Login clicked");
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "orion-auth",
        "true"
      );

      router.push("/");
    } else {
      setError(
        "Invalid username or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Orion DNS
          </h1>

          <p className="text-center text-slate-500 mb-8">
            AWS Route53 Clone
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              className="w-full border rounded-lg p-3"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <Button
              className="w-full"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>

          <div className="mt-6 text-sm text-slate-500 text-center">
            Demo Credentials
            <br />
            admin / admin123
          </div>
        </CardContent>
      </Card>
    </div>
  );
}