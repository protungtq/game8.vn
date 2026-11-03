// Thứ tự ưu tiên ảnh của game (thống nhất 2026-11-03):
// ảnh bìa → thumbnail bài viết mới nhất của game → thumb trailer (YouTube) → icon.
export function ytThumb(url?: string): string {
  if (!url) return '';
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : '';
}

// Map slug game -> ảnh của bài viết có ảnh mới nhất thuộc game đó.
// Nhận vào danh sách bài (đã có gameSlug + image + _ts), tự sắp xếp giảm dần theo thời gian.
export function latestPostImageMap(posts: { gameSlug?: string; image?: string; _ts?: number }[]): Record<string, string> {
  const map: Record<string, string> = {};
  const sorted = [...posts].sort((a, b) => (b._ts || 0) - (a._ts || 0));
  for (const p of sorted) {
    if (p.gameSlug && p.image && !map[p.gameSlug]) map[p.gameSlug] = p.image;
  }
  return map;
}

// Ảnh khổ ngang (16:9) của game: bìa → ảnh bài mới nhất → thumb trailer.
export function gameArt(g: any, postImg?: string): string {
  return (g && g.cover) || postImg || ytThumb(g && g.trailer) || '';
}

// Ảnh đại diện đầy đủ: bìa → ảnh bài mới nhất → thumb trailer → icon.
export function gameImage(g: any, postImg?: string): string {
  return gameArt(g, postImg) || (g && g.icon) || '';
}
