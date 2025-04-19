import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-full w-9 h-9 border-neutral/20 bg-background/30 backdrop-blur-sm"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <FaSun className="h-4 w-4 text-yellow-300" />
      ) : (
        <FaMoon className="h-4 w-4 text-blue-500" />
      )}
    </Button>
  );
}