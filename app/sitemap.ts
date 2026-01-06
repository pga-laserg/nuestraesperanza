import { getAllContentMeta } from '@/lib/content';

export default async function sitemap() {
  const items = await getAllContentMeta();
  return items.map((item) => ({
    url: `/${item.slug}/`,
    lastModified: item.lastUpdated || undefined,
  }));
}
