import { footer, person } from "@/data/content";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line px-gutter py-8">
      <div className="mx-auto flex max-w-page flex-col gap-3 text-caption text-subtle sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p>
          © {YEAR} {person.name}
        </p>
        <p>{footer.photoCredit}</p>
        <a
          href="#beranda"
          className="-my-2 self-start rounded-sm py-2 underline underline-offset-4 transition-colors duration-150 hover:text-foreground sm:self-auto"
        >
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
