import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type ContentType = 'post' | 'page';

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  lastUpdated?: string;
  featuredImage?: string;
  body: string;
  type: ContentType;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const CONTENT_DIRS: Record<ContentType, string> = {
  post: path.join(CONTENT_ROOT, 'posts'),
  page: path.join(CONTENT_ROOT, 'pages'),
};

async function readFileIfExists(filePath: string) {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (err: any) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

async function loadItems(type: ContentType): Promise<ContentItem[]> {
  const dir = CONTENT_DIRS[type];
  const entries = await fs.readdir(dir);
  const items: ContentItem[] = [];

  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue;
    const fullPath = path.join(dir, entry);
    const raw = await readFileIfExists(fullPath);
    if (!raw) continue;
    const parsed = matter(raw);
    const slug = parsed.data.slug as string;
    const title = parsed.data.title as string;
    const description = (parsed.data.description as string) || '';
    const lastUpdated = parsed.data.lastUpdated as string | undefined;
    const featuredImage = parsed.data.featuredImage as string | undefined;

    const processed = await remark().use(html).process(parsed.content);
    const body = processed.toString();

    items.push({
      slug,
      title,
      description,
      lastUpdated,
      featuredImage,
      body,
      type,
    });
  }

  return items;
}

export async function getAllContent(): Promise<ContentItem[]> {
  const [posts, pages] = await Promise.all([loadItems('post'), loadItems('page')]);
  return [...posts, ...pages];
}

export async function getAllContentMeta() {
  const items = await getAllContent();
  return items.map(({ slug, title, description, lastUpdated, featuredImage, type }) => ({
    slug,
    title,
    description,
    lastUpdated,
    featuredImage,
    type,
  }));
}

export async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  const items = await getAllContent();
  return items.find((item) => item.slug === slug) ?? null;
}
