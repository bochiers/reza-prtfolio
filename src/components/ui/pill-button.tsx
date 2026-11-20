import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all hover:gap-3 sm:text-base";

const variants: Record<Variant, { root: string; circle: string; arrow: string }> = {
  primary: {
    root: "bg-primary text-primary-foreground",
    circle: "bg-primary-foreground",
    arrow: "text-primary",
  },
  secondary: {
    root: "border border-primary/40 text-primary hover:border-primary",
    circle: "bg-primary",
    arrow: "text-primary-foreground",
  },
};

function Circle({ variant }: { variant: Variant }) {
  const v = variants[variant];
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110 sm:h-10 sm:w-10",
        v.circle,
      )}
    >
      <ArrowRight aria-hidden className={cn("h-4 w-4", v.arrow)} />
    </span>
  );
}

type AnchorProps = ComponentProps<"a"> & { variant?: Variant; children: ReactNode };

export function PillLink({ variant = "primary", className, children, ...props }: AnchorProps) {
  return (
    <a className={cn(base, variants[variant].root, className)} {...props}>
      {children}
      <Circle variant={variant} />
    </a>
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; children: ReactNode };

export function PillButton({ variant = "primary", className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant].root, className)} {...props}>
      {children}
      <Circle variant={variant} />
    </button>
  );
}
