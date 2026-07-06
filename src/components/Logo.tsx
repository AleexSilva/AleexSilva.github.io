export function Logo({ hoverable = false }: { hoverable?: boolean }) {
  return (
    <span
      className={`grid h-8 w-8 place-items-center rounded-md bg-amber/15 font-display text-sm font-semibold text-amber ring-1 ring-amber/30 transition ${
        hoverable ? "group-hover:bg-amber/25" : ""
      }`}
    >
      AS
    </span>
  );
}
