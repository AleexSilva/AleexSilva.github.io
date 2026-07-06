import { navItems } from "@/lib/content";

type NavLinksProps = {
  className: string;
  onItemClick?: () => void;
};

export function NavLinks({ className, onItemClick }: NavLinksProps) {
  return (
    <>
      {navItems.map((item) => (
        <a key={item.href} href={item.href} onClick={onItemClick} className={className}>
          {item.label}
        </a>
      ))}
    </>
  );
}
