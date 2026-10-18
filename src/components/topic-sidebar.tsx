'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import type { LearningPath } from '@/types';

export function TopicSidebar({ path }: { path: LearningPath }) {
  const pathname = usePathname();

  return (
    <nav className="w-full space-y-4" aria-label="Topics">
      {path.topics.map((topic) => (
        <div key={topic.id}>
          <h4 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {topic.title}
          </h4>
          <ul className="space-y-0.5">
            {topic.subtopics.map((sub) => {
              const href = `/paths/${path.slug}/${topic.id}/${sub.id}`;
              const active = pathname === href;
              return (
                <li key={sub.id}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      active
                        ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 ${active ? 'text-blue-500' : 'text-zinc-400'}`}
                    />
                    <span className="truncate">{sub.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
