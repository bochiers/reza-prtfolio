import { navItems } from "@/data/content";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

// Includes sections that are not in the nav so the underline clears when they are in view.
const observedIds = ["beranda", "tentang", "pengalaman", "sorotan", "keahlian", "organisasi", "kontak"] as const;

/** Fixed black notch nav (Prisma style). Five items only: more would overflow at 360px. */
export function SiteNav() {
  const active = useActiveSection(observedIds);

  return (
    <nav aria-label="Navigasi utama" className="fixed left-1/2 top-0 z-50 -translate-x-1/2">
      <ul className="flex items-center gap-3 whitespace-nowrap rounded-b-2xl bg-black px-4 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
        {navItems.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "inline-block rounded-sm border-b-2 py-3 text-xs transition-colors duration-150 active:border-accent md:py-2 md:text-sm",
                  current
                    ? "border-accent text-foreground"
                    : "border-transparent text-foreground/90 hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
