import { notFound } from 'next/navigation';
import { Clock, Signal, Lightbulb, Video } from 'lucide-react';
import { getSubtopic, learningPaths } from '@/data';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { MarkdownContent } from '@/components/markdown-content';
import { VideoCard } from '@/components/video-card';
import { TopicSidebar } from '@/components/topic-sidebar';
import { LessonNav } from './lesson-nav';

export function generateStaticParams() {
  const params: { slug: string; topicId: string; subtopicId: string }[] = [];
  for (const path of learningPaths) {
    for (const topic of path.topics) {
      for (const sub of topic.subtopics) {
        params.push({ slug: path.slug, topicId: topic.id, subtopicId: sub.id });
      }
    }
  }
  return params;
}

export async function generateMetadata(
  props: PageProps<'/paths/[slug]/[topicId]/[subtopicId]'>
) {
  const { slug, topicId, subtopicId } = await props.params;
  const result = getSubtopic(slug, topicId, subtopicId);
  if (!result) return {};
  return {
    title: `${result.subtopic.title} — ${result.path.title} — LearnPath`,
    description: result.subtopic.description,
  };
}

export default async function SubtopicPage(
  props: PageProps<'/paths/[slug]/[topicId]/[subtopicId]'>
) {
  const { slug, topicId, subtopicId } = await props.params;
  const result = getSubtopic(slug, topicId, subtopicId);
  if (!result) notFound();

  const { path, topic, subtopic } = result;

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6">
      {/* Sidebar — hidden on mobile */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
          <TopicSidebar path={path} />
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1">
        <Breadcrumbs
          crumbs={[
            { label: path.title, href: `/paths/${path.slug}` },
            { label: topic.title },
            { label: subtopic.title },
          ]}
        />

        {/* Header */}
        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {subtopic.title}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {subtopic.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {subtopic.estimatedTime}
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                subtopic.difficulty === 'beginner'
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : subtopic.difficulty === 'intermediate'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                    : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'
              }`}
            >
              <Signal className="h-3.5 w-3.5" />
              {subtopic.difficulty}
            </span>
          </div>
        </div>

        {/* Lesson content */}
        <article className="mb-10">
          <MarkdownContent content={subtopic.content} />
        </article>

        {/* Key takeaways */}
        {subtopic.keyTakeaways.length > 0 && (
          <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-800 dark:text-amber-400">
              <Lightbulb className="h-5 w-5" />
              Key Takeaways
            </h2>
            <ul className="space-y-2">
              {subtopic.keyTakeaways.map((takeaway, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-300"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {takeaway}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Video resources */}
        {subtopic.videos.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              <Video className="h-5 w-5" />
              Video Resources
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {subtopic.videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* Prev/Next navigation */}
        <LessonNav path={path} currentTopicId={topicId} currentSubtopicId={subtopicId} />
      </main>
    </div>
  );
}
