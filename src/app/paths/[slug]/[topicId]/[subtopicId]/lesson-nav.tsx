import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { LearningPath } from '@/types';

interface LessonNavProps {
  path: LearningPath;
  currentTopicId: string;
  currentSubtopicId: string;
}

export function LessonNav({ path, currentTopicId, currentSubtopicId }: LessonNavProps) {
  // Flatten all subtopics into an ordered list
  const flat: { topicId: string; subtopicId: string; title: string }[] = [];
  for (const topic of path.topics) {
    for (const sub of topic.subtopics) {
      flat.push({ topicId: topic.id, subtopicId: sub.id, title: sub.title });
    }
  }

  const currentIdx = flat.findIndex(
    (f) => f.topicId === currentTopicId && f.subtopicId === currentSubtopicId
  );

  const prev = currentIdx > 0 ? flat[currentIdx - 1] : null;
  const next = currentIdx < flat.length - 1 ? flat[currentIdx + 1] : null;

  return (
    <nav className="flex items-stretch gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      {prev ? (
        <Link
          href={`/paths/${path.slug}/${prev.topicId}/${prev.subtopicId}`}
          className="flex flex-1 items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-zinc-400" />
          <span className="truncate text-zinc-700 dark:text-zinc-300">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/paths/${path.slug}/${next.topicId}/${next.subtopicId}`}
          className="flex flex-1 items-center justify-end gap-3 rounded-xl border border-zinc-200 px-4 py-3 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
        >
          <span className="truncate text-zinc-700 dark:text-zinc-300">{next.title}</span>
          <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
