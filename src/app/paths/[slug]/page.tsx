import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, BookOpen, Signal, CheckCircle2, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { getPathBySlug, learningPaths } from '@/data';
import { Breadcrumbs } from '@/components/breadcrumbs';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

export function generateStaticParams() {
  return learningPaths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/paths/[slug]'>) {
  const { slug } = await props.params;
  const path = getPathBySlug(slug);
  if (!path) return {};
  return {
    title: `${path.title} — LearnPath`,
    description: path.description,
  };
}

export default async function PathDetailPage(props: PageProps<'/paths/[slug]'>) {
  const { slug } = await props.params;
  const path = getPathBySlug(slug);
  if (!path) notFound();

  const totalLessons = path.topics.reduce((s, t) => s + t.subtopics.length, 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs crumbs={[{ label: path.title }]} />

      {/* Header */}
      <div className="mt-6 mb-10">
        <div
          className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${path.gradient}`}
        >
          <DynamicIcon name={path.icon} className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {path.title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {path.longDescription}
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {path.topics.length} topics · {totalLessons} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {path.estimatedDuration}
          </span>
          <span className="flex items-center gap-1.5">
            <Signal className="h-4 w-4" />
            {path.difficulty}
          </span>
        </div>

        {/* Prerequisites */}
        {path.prerequisites.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Prerequisites
            </h3>
            <ul className="space-y-2">
              {path.prerequisites.map((prereq) => (
                <li
                  key={prereq}
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Topics */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Topics
        </h2>
        <div className="space-y-4">
          {path.topics.map((topic, idx) => (
            <div
              key={topic.id}
              className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {topic.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {topic.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {topic.subtopics.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={`/paths/${path.slug}/${topic.id}/${sub.id}`}
                          className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                        >
                          <span className="text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                            {sub.title}
                          </span>
                          <span className="flex items-center gap-2 text-xs text-zinc-400">
                            <span
                              className={`rounded-full px-2 py-0.5 ${
                                sub.difficulty === 'beginner'
                                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                                  : sub.difficulty === 'intermediate'
                                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                                    : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                              }`}
                            >
                              {sub.difficulty}
                            </span>
                            <span>{sub.estimatedTime}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-zinc-300 transition-transform group-hover:translate-x-0.5 dark:text-zinc-600" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
