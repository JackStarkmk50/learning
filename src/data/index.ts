import { roboticsPath } from './robotics-path';
import { ros2Path } from './ros2-path';
import { embeddedPath } from './embedded-path';
import type { LearningPath } from '@/types';

export const learningPaths: LearningPath[] = [
  ros2Path,
  roboticsPath,
  embeddedPath,
];

export function getPathBySlug(slug: string): LearningPath | undefined {
  return learningPaths.find((p) => p.slug === slug);
}

export function getSubtopic(slug: string, topicId: string, subtopicId: string) {
  const path = getPathBySlug(slug);
  if (!path) return null;
  const topic = path.topics.find((t) => t.id === topicId);
  if (!topic) return null;
  const subtopic = topic.subtopics.find((s) => s.id === subtopicId);
  if (!subtopic) return null;
  return { path, topic, subtopic };
}
