import { person } from "@/data/content";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-primary/15 px-4 py-8 sm:px-6 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-primary/70">
        <p>
          © {YEAR} {person.name}
        </p>
        <a href="#top" className="hover:text-primary">
          Kembali ke atas
        </a>
      </div>
    </footer>
  );
}
