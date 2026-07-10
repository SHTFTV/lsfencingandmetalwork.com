import { useState } from "react";
import type { BlogPost } from "@/lib/blog";
import { DEFAULT_BLOG_IMAGE, getPostImage, getPostImageAlt } from "@/lib/blog";

type Variant = "hero" | "thumb";

interface Props {
  post: Pick<BlogPost, "ogImage" | "ogImageCaption" | "title" | "cityName" | "region" | "tags">;
  variant?: Variant;
  eager?: boolean;
  className?: string;
}

/**
 * Responsive, lazy-loaded blog image with a hard fallback so a missing
 * asset can never break a post render. Renders a shimmering skeleton
 * underneath the image until it decodes so cards don't jump or show
 * empty space while thumbnails load on mobile.
 */
export function BlogImage({ post, variant = "thumb", eager = false, className }: Props) {
  const primary = getPostImage(post);
  const [src, setSrc] = useState(primary);
  const [loaded, setLoaded] = useState(false);
  const alt = getPostImageAlt(post);

  const sizes =
    variant === "hero"
      ? "(min-width: 1024px) 768px, (min-width: 640px) 90vw, 100vw"
      : "(min-width: 1024px) 560px, (min-width: 640px) 45vw, 100vw";

  return (
    <div className="relative w-full h-full overflow-hidden bg-muted">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted animate-pulse"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={1200}
        height={630}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        {...(eager ? { fetchPriority: "high" as const } : {})}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (src !== DEFAULT_BLOG_IMAGE) {
            setSrc(DEFAULT_BLOG_IMAGE);
          } else {
            setLoaded(true);
          }
        }}
        className={`${className ?? "w-full h-full object-cover"} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
