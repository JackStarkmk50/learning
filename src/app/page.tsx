import { GraduationCap, Rocket } from 'lucide-react';
import { learningPaths } from '@/data';
import { PathCard } from '@/components/path-card';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
          <Rocket className="h-4 w-4" />
          Free &amp; Open Learning Paths
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Master Robotics &amp; Embedded Systems
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Structured learning paths with curated YouTube resources covering ROS2,
          robotics fundamentals, and embedded systems — from beginner to advanced.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-zinc-500">
          <GraduationCap className="h-5 w-5" />
          <span>
            {learningPaths.length} paths ·{' '}
            {learningPaths.reduce((s, p) => s + p.topics.length, 0)} topics ·{' '}
            {learningPaths.reduce(
              (s, p) => s + p.topics.reduce((ts, t) => ts + t.subtopics.length, 0),
              0
            )}{' '}
            lessons
          </span>
        </div>
      </section>

      {/* Path Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </section>
    </main>
  );
}
