import Link from 'next/link';
import { Clock, BookOpen, Signal } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LearningPath } from '@/types';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export function PathCard({ path }: { path: LearningPath }) {
  const topicCount = path.topics.length;
  const subtopicCount = path.topics.reduce((sum, t) => sum + t.subtopics.length, 0);

  return (
    <Link
      href={`/paths/${path.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div
        className={`flex h-36 items-center justify-center bg-gradient-to-br ${path.gradient}`}
      >
        <DynamicIcon name={path.icon} className="h-16 w-16 text-white/90" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {path.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {path.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-3 pt-3 text-xs text-zinc-500 dark:text-zinc-500">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {topicCount} topics · {subtopicCount} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {path.estimatedDuration}
          </span>
          <span className="flex items-center gap-1">
            <Signal className="h-3.5 w-3.5" />
            {path.difficulty}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {path.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
