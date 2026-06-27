import { sanitizeHref, isExternalHref } from "@/lib/security";
import { cn } from "@/lib/utils";

interface SafeLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  fallbackHref?: string;
}

export function SafeLink({
  href,
  fallbackHref = "#",
  rel,
  target,
  className,
  children,
  ...props
}: SafeLinkProps) {
  const safeHref = sanitizeHref(href, fallbackHref);
  const external = isExternalHref(safeHref);

  return (
    <a
      href={safeHref}
      className={cn(className)}
      target={target ?? (external ? "_blank" : undefined)}
      rel={
        rel ?? (external ? "noopener noreferrer" : undefined)
      }
      {...props}
    >
      {children}
    </a>
  );
}
