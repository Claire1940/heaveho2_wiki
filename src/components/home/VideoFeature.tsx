"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ExternalLink } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

/**
 * 视频区域：
 * - 初始展示缩略图 + 播放按钮（后备交互）
 * - 进入视口时自动加载并播放（autoplay=1&mute=1&loop=1）
 * - 点击播放按钮同样激活播放
 */
export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [useHqThumb, setUseHqThumb] = useState(false);

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  // loop=1 需要 playlist=videoId 才能在单视频嵌入中循环
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`;
  const thumbSrc = useHqThumb
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    if (active) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg bg-black/40"
        style={{ paddingBottom: "56.25%" }}
      >
        {active ? (
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* 缩略图 */}
            <img
              src={thumbSrc}
              alt={title}
              loading="lazy"
              onError={() => setUseHqThumb(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* 遮罩 */}
            <span className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/20" />
            {/* 播放按钮 */}
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[hsl(var(--nav-theme))] shadow-lg shadow-[hsl(var(--nav-theme)/0.4)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
              <Play className="ml-1 h-7 w-7 text-white md:h-9 md:w-9" fill="currentColor" />
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
