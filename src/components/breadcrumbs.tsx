import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400" aria-label="Breadcrumb">
      <Link href="/" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200">
        <Home className="h-4 w-4" />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600" />
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
