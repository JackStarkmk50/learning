import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <span className="text-zinc-900 dark:text-zinc-50">LearnPath</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            All Paths
          </Link>
        </div>
      </div>
    </nav>
  );
}
