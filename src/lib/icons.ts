import type { LucideIcon } from "lucide-react";

export function resolveIcon(
  map: Record<string, LucideIcon>,
  key: string,
  fallback: LucideIcon,
): LucideIcon {
  return map[key] ?? fallback;
}
