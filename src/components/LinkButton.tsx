import type { AnchorHTMLAttributes, ReactNode } from "react";

const VARIANT_CLASSES = {
  primary: "bg-amber text-[#1a1205] hover:bg-amber-bright",
  secondary:
    "border border-border-strong bg-surface/50 text-fg backdrop-blur hover:border-amber/50 hover:bg-surface",
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof VARIANT_CLASSES;
  children: ReactNode;
};

export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={`inline-flex items-center transition ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
