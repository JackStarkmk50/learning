'use client';

import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import type { VideoResource } from '@/types';

/**
 * Extract embeddable YouTube URL.
 * Returns null for channel URLs or unrecognized formats.
 */
function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // /watch?v=ID or /watch?v=ID&t=300
    const videoId = u.searchParams.get('v');
    if (videoId) {
      const clean = videoId.split('&')[0]; // strip trailing params in value
      return `https://www.youtube-nocookie.com/embed/${clean}`;
    }
    // /playlist?list=ID
    const listId = u.searchParams.get('list');
    if (listId) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}`;
    }
    // /shorts/ID
    const shortsMatch = u.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) {
      return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;
    }
    return null;
  } catch {
    return null;
  }
}

export function VideoCard({ video }: { video: VideoResource }) {
  const embedUrl = getEmbedUrl(video.url);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* Embed area */}
      {embedUrl && playing ? (
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`${embedUrl}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : embedUrl ? (
        <button
          onClick={() => setPlaying(true)}
          className="group relative flex aspect-video w-full items-center justify-center bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
          </div>
          <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {video.channel}
          </span>
        </button>
      ) : null}

      {/* Info */}
      <div className="p-4">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">{video.title}</p>
        {!embedUrl && (
          <p className="mt-0.5 text-sm text-zinc-500">{video.channel}</p>
        )}
        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {video.description}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
          {video.duration && <span>{video.duration}</span>}
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <ExternalLink className="h-3 w-3" />
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
