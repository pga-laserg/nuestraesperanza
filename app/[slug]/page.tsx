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
    return { title: 'Página no encontrada' };
  }

  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: `/${item.slug}/`,
    },
  };
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const item = await getContentBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <article>
      <div className="container">
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1rem' }}>{item.title}</h1>
          {item.lastUpdated && (
            <div style={{ color: 'var(--text-light)', fontSize: '0.95rem', fontStyle: 'italic' }}>
              Última actualización: {formatDate(item.lastUpdated)}
            </div>
          )}
        </header>

        {item.featuredImage ? (
          <div className="info-image" style={{ marginBottom: '3rem' }}>
            <img src={item.featuredImage} alt={item.title} />
          </div>
        ) : null}

        <div
          className="content-body"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />

        <footer style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <a href="/" className="btn ghost">Volver al inicio</a>
        </footer>
      </div>
    </article>
  );
}
