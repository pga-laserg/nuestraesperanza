import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
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
    <article style={{ maxWidth: 'none', margin: 0, padding: 0 }}>
      <section className="section white-bg">
        <div className="container" style={{ maxWidth: '800px' }}>
          <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div className="asterisk">✻</div>
            <h1 style={{ marginBottom: '1rem', fontStyle: 'normal' }}>{item.title}</h1>
            {item.lastUpdated && (
              <div style={{ color: 'var(--text-light)', fontSize: '0.95rem', fontStyle: 'italic' }}>
                Última actualización: {formatDate(item.lastUpdated)}
              </div>
            )}
          </header>

          {item.featuredImage ? (
            <div className="info-image" style={{ marginBottom: '4rem' }}>
              <img src={item.featuredImage} alt={item.title} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)' }} />
            </div>
          ) : null}

          <div
            className="content-body"
            dangerouslySetInnerHTML={{ __html: item.body }}
          />

          <footer style={{ marginTop: 'var(--section-pad)', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <Link href="/" className="btn black">Volver al inicio</Link>
          </footer>
        </div>
      </section>
    </article>
  );
}
