export interface VideoResource {
  id: string;
  title: string;
  channel: string;
  url: string;
  description: string;
  duration?: string;
}

export interface SubTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  keyTakeaways: string[];
  videos: VideoResource[];
  prerequisites?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  subtopics: SubTopic[];
  order: number;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  gradient: string;
  topics: Topic[];
  prerequisites: string[];
  estimatedDuration: string;
  difficulty: string;
  tags: string[];
}
