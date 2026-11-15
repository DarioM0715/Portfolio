import { Moon, Sun } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useState } from "react";
import { Button } from "./Button";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <Button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      aria-pressed={dark}
    >
      <MorphIcon icon={dark ? Moon : Sun} size={16} spring="snappy" />
    </Button>
  );
}
