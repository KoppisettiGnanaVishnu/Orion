"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
  variant="outline"
  className="
    bg-slate-800
    text-white
    border-slate-700
    hover:bg-slate-700
    hover:text-white
  "
  onClick={() =>
    setTheme(theme === "dark" ? "light" : "dark")
  }
>
      {theme === "dark"
        ? "☀️ Light"
        : "🌙 Dark"}
    </Button>
  );
}