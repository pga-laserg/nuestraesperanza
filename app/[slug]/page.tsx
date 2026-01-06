import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllContentMeta, getContentBySlug } from '@/lib/content';

export async function generateStaticParams() {
  const items = await getAllContentMeta();
  return items.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getContentBySlug(params.slug);
  if (!item) {
    return { title: 'No encontrado' };
  }

  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: `/${item.slug}/`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const item = await getContentBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <article>
      <h1>{item.title}</h1>
      {item.featuredImage ? (
        <p>
          <img src={item.featuredImage} alt={item.title} />
        </p>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: item.body }} />
      {item.lastUpdated ? (
        <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#52606d' }}>
          Actualizado: {item.lastUpdated}
        </p>
      ) : null}
    </article>
  );
}
