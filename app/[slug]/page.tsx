import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllContentMeta, getContentBySlug } from '@/lib/content';
import { FacebookVideo } from '@/app/components/FacebookVideo';
import { ContactForm } from '@/app/components/ContactForm';

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

function categoryForSlug(slug: string) {
  if (slug.includes('encuentro')) return 'Noticias';
  if (slug.includes('inclusion')) return 'Recursos accesibles';
  return 'Blog';
}

export default async function Page({ params }: { params: { slug: string } }) {
  const item = await getContentBySlug(params.slug);
  const isLaSerena = item?.slug === 'encuentro-nacional-la-serena';
  const isHistoria = item?.slug === 'historia';
  const isContacto = item?.slug === 'contacto';
  const isRecursos = item?.slug === 'recursos';
  const isUltimasPublicaciones = item?.slug === 'ultimas-publicaciones';

  if (!item) {
    notFound();
  }

  // Fetch posts if this is the blog page
  let posts: any[] = [];
  if (isUltimasPublicaciones) {
    const allItems = await getAllContentMeta();
    posts = allItems.filter((i) => i.type === 'post');
    posts.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));
  }

  let bodyBefore = isContacto ? '' : item.body;
  let bodyAfter = '';

  if (isLaSerena) {
    const imgIdx = item.body.indexOf('<p><img');
    if (imgIdx !== -1) {
      bodyBefore = item.body.slice(0, imgIdx);
      bodyAfter = item.body.slice(imgIdx);
    }
  }

  const articleClassNames = [
    isHistoria ? 'historia-article' : '',
    isRecursos ? 'recursos-article' : '',
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <article className={articleClassNames} style={{ maxWidth: 'none', margin: 0, padding: 0 }}>
      <section className="section white-bg">
        <div className="container" style={{ maxWidth: '800px' }}>
          <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <div className="asterisk">✻</div>
            <h1 style={{ marginBottom: '1rem', fontStyle: 'normal' }}>{item.title}</h1>
          </header>

          {isContacto ? (
            <div style={{ margin: '0 0 2rem 0' }}>
              <p className="contact-intro">Completa el formulario y te responderemos a la brevedad.</p>
              <ContactForm />
            </div>
          ) : (
            <div className="content-body" dangerouslySetInnerHTML={{ __html: bodyBefore }} />
          )}

          {isLaSerena ? (
            <div style={{ margin: '2.5rem 0' }}>
              <FacebookVideo url="https://www.facebook.com/nuestraesperanza.cl/videos/1545216239459170/" />
            </div>
          ) : null}

          {isUltimasPublicaciones ? (
            <div className="post-list" style={{ marginTop: '2rem' }}>
              {posts.map((post) => (
                <Link href={`/${post.slug}/`} className="post-item" key={post.slug}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span className="badge">{categoryForSlug(post.slug)}</span>
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#111' }}>
                    {post.title}
                  </h3>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {post.lastUpdated && <span>{formatDate(post.lastUpdated)}</span>}
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-light)' }}>{post.description}</p>
                </Link>
              ))}
              {posts.length === 0 && <p style={{ textAlign: 'center' }}>No hay publicaciones disponibles en este momento.</p>}
            </div>
          ) : null}

          {bodyAfter ? <div className="content-body" dangerouslySetInnerHTML={{ __html: bodyAfter }} /> : null}

          <footer style={{ marginTop: 'var(--section-pad)', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <Link href="/" className="btn black">Volver al inicio</Link>
          </footer>
        </div>
      </section>
    </article>
  );
}
