import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-[gap,background-color,border-color] duration-250 ease-out-expo hover:gap-3 motion-reduce:transition-colors motion-reduce:hover:gap-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-45 aria-disabled:hover:gap-2 disabled:cursor-not-allowed disabled:opacity-45 sm:text-base";

const variants: Record<Variant, { root: string; circle: string; arrow: string }> = {
  primary: {
    root: "bg-foreground text-background active:bg-[color-mix(in_oklab,var(--color-foreground)_92%,black)]",
    circle: "bg-background",
    arrow: "text-foreground",
  },
  secondary: {
    root: "border border-line-strong text-foreground hover:border-foreground active:bg-surface-2",
    circle: "bg-foreground",
    arrow: "text-background",
  },
};

function Circle({ variant }: { variant: Variant }) {
  const v = variants[variant];
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-250 ease-out-expo group-hover:scale-110 group-active:scale-95 motion-reduce:transform-none sm:h-10 sm:w-10",
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
