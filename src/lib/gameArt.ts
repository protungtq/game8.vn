// Thứ tự ưu tiên ảnh của game: ảnh bìa → ảnh thumb trailer (YouTube) → icon.
export function ytThumb(url?: string): string {
  if (!url) return '';
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : '';
}

// Ảnh khổ ngang (16:9) của game: bìa, thiếu thì thumb trailer.
export function gameArt(g: any): string {
  return (g && g.cover) || ytThumb(g && g.trailer) || '';
}

// Ảnh đại diện đầy đủ: bìa → thumb trailer → icon.
export function gameImage(g: any): string {
  return gameArt(g) || (g && g.icon) || '';
}
