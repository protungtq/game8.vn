import { getCollection } from 'astro:content';
import games from '../data/games.json';

export const prerender = true;

export async function GET({ site }: { site?: URL }) {
  const base = (site?.href || 'https://game8.vn/').replace(/\/?$/, '/');
  const posts = await getCollection('posts');
  const today = new Date().toISOString().slice(0, 10);

  type U = { loc: string; lastmod: string; changefreq: string; priority: string };
  const urls: U[] = [
    { loc: '', lastmod: today, changefreq: 'daily', priority: '1.0' },
    { loc: 'mobile/', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { loc: 'pc/', lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { loc: 'cap-nhat/', lastmod: today, changefreq: 'daily', priority: '0.8' },
    ...games.map((g: any) => ({
      loc: `game/${g.slug}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    })),
    ...posts.map((p: any) => ({
      loc: `p/${String(p.id).replace(/\.(md|mdx)$/i, '')}/`,
      lastmod: p.data.date ? new Date(p.data.date).toISOString().slice(0, 10) : today,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${base}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
      )
      .join('\n') +
    `\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
