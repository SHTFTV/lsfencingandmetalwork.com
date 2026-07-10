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
 * asset can never break a post render. Uses the intrinsic 1200x630 asset
 * with a `sizes` hint so the browser can pick an efficient decode size.
 */
export function BlogImage({ post, variant = "thumb", eager = false, className }: Props) {
  const primary = getPostImage(post);
  const [src, setSrc] = useState(primary);
  const alt = getPostImageAlt(post);

  const sizes =
    variant === "hero"
      ? "(min-width: 1024px) 768px, (min-width: 640px) 90vw, 100vw"
      : "(min-width: 1024px) 560px, (min-width: 640px) 45vw, 100vw";

  return (
    <img
      src={src}
      alt={alt}
      width={1200}
      height={630}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      onError={() => {
        if (src !== DEFAULT_BLOG_IMAGE) setSrc(DEFAULT_BLOG_IMAGE);
      }}
      className={className ?? "w-full h-full object-cover"}
    />
  );
}
