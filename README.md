# Game8.VN

Cổng thông tin game Việt Nam — game làm nội dung chính (kiểu Google Play Store), bài viết là vệ tinh trong từng game.

## Cấu trúc

- `src/data/games.json` — Database 47 game (icon, cover, trailer, mô tả, SEO)
- `src/pages/index.astro` — Trang chủ lưới game
- `src/pages/game/[slug].astro` — Chi tiết game + bài viết liên quan
- `src/pages/tin-tuc.astro` — Danh sách bài viết
- `src/pages/tin/[slug].astro` — Chi tiết bài viết
- `src/content/posts/` — Bài viết Markdown (frontmatter có field `game: "slug"`)
- `public/tools/games.html` — Tool quản lý game (thêm/sửa/xóa, đẩy lên GitHub)

## Quản lý game

Mở `/tools/games.html` trên site → thêm/sửa/xóa game bằng form → bấm "Đẩy lên GitHub" → Cloudflare Pages tự rebuild.

## Deploy

Cloudflare Pages: build command `npm run build`, output `dist`.
