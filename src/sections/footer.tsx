import { footer, person } from "@/data/content";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line px-gutter py-8">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-3 text-caption text-subtle">
        <p>
          © {YEAR} {person.name}
        </p>
        <a href="#beranda" className="-my-2 rounded-sm py-2 underline underline-offset-4 transition-colors duration-150 hover:text-foreground">
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
