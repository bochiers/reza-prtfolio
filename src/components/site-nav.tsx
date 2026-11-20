import { navItems } from "@/data/content";

/** Fixed black notch nav (Prisma style) with real section anchors. */
export function SiteNav() {
  return (
    <nav aria-label="Navigasi utama" className="fixed left-1/2 top-0 z-50 -translate-x-1/2">
      <ul className="flex items-center gap-2.5 whitespace-nowrap rounded-b-2xl bg-black px-4 py-1 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="inline-block py-2 text-[11px] text-primary/80 transition-colors hover:text-primary sm:text-xs md:text-sm"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
