import Link from 'next/link';
import { getAllContentMeta } from '@/lib/content';

const pillars = [
  {
    title: 'Literatura accesible',
    desc: 'Producimos y facilitamos literatura en braille y formatos audibles.',
  },
  {
    title: 'Estudio de la Biblia',
    desc: 'Adaptamos cursos de estudio de la Biblia y organizamos una escuela bíblica virtual con encuentros semanales.',
  },
  {
    title: 'Eventos',
    desc: 'Organizamos encuentros en nacionales, talleres de desarrollo personal y celebramos la inclusión en iglesias locales.',
  },
];

const missionVision = [
  {
    title: 'Misión',
    desc: 'Producir y distribuir literatura cristiana en formatos accesibles que fortalezcan la fe, promuevan el desarrollo personal y familiar, y fomenten la inclusión en la vida espiritual.',
    image: '/images/ne-30-scaled.jpg',
  },
  {
    title: 'Visión',
    desc: 'Ser un puente de esperanza y fe para todas las personas con discapacidad visual en Chile y más allá.',
    image: '/images/DSCN3854-scaled.jpg',
  },
];
function categoryForSlug(slug: string) {
  if (slug.includes('encuentro')) return 'Noticias';
  if (slug.includes('inclusion')) return 'Recursos accesibles';
  return 'Blog';
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export default async function HomePage() {
  const items = await getAllContentMeta();
  const posts = items.filter((i) => i.type === 'post');
  posts.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              Compartiendo la esperanza de Jesús con personas ciegas y de baja visión
            </h1>
            <p>
              Desde 2003, trabajamos incansablemente para llevar el evangelio y literatura accesible a través de todo Chile.
            </p>
            <div className="button-row">
              <Link className="btn primary" href="#sobre-nosotros">
                Conoce más
              </Link>
              <Link className="btn ghost" href="/recursos/">
                Ver recursos
              </Link>
            </div>
          </div>
          <div className="info-image" style={{ marginTop: '4rem' }}>
            <img
              src="/images/Firefly-20241223185222.png"
              alt="Mujer con bastón en parque con audífonos"
            />
          </div>
        </div>
      </section>
      <section className="section gray-bg" id="sobre-nosotros">
        <div className="container">
          <div className="section-header-alt">
            <div className="asterisk">✻</div>
            <h2>Dos décadas de servicio inclusivo en Chile</h2>
            <p className="section-subtitle">
              Por más de 20 años nuestra labor se ha concentrado en promover la igualdad de derechos y oportunidades, reflejando el amor de Cristo en cada acción.
            </p>
          </div>
          <div className="feature-grid">
            {pillars.map((pillar) => (
              <div className="feature" key={pillar.title}>
                <div className="asterisk-left">✻</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header-alt">
            <div className="asterisk">✻</div>
            <h2>Comprometidos con la inclusión</h2>
            <p className="section-subtitle">
              Nuestra Esperanza es una corporación laica integrada por miembros de la Iglesia Adventista del Séptimo Día comprometidos con el desarrollo integral de personas con discapacidad visual.
            </p>
          </div>

          {missionVision.map((item, idx) => (
            <div className={`info-row ${idx % 2 !== 0 ? 'reverse' : ''}`} key={item.title}>
              <div className="info-text">
                <div className="asterisk-left">✻</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="info-image">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="blockquote">
        <div className="container">
          <div className="quote-text">
            «De justicia y rectitud me revestí;<br />
            ellas eran mi manto y mi turbante.
          </div>
          <div className="quote-text">
            Para los ciegos fui sus ojos;<br />
            para los cojos, sus pies.»
          </div>
          <cite>
            Job 29:14, 15<br />
            <span>Nueva Versión Internacional</span>
          </cite>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Últimas publicaciones</h2>
          <div className="post-list">
            {posts.map((post) => (
              <div className="post-item" key={post.slug}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="badge">{categoryForSlug(post.slug)}</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>
                  <Link href={`/${post.slug}/`}>{post.title}</Link>
                </h3>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {post.lastUpdated && <span>{formatDate(post.lastUpdated)}</span>}
                  <span style={{ margin: '0 0.5rem' }}>•</span>
                  <span>Por Froilán Gallardo</span>
                </div>
                <p style={{ margin: 0 }}>{post.description}</p>
              </div>
            ))}
            {posts.length === 0 && <p style={{ textAlign: 'center' }}>No hay publicaciones disponibles en este momento.</p>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-card">
            <h2>Conéctate con nosotros</h2>
            <p>Estamos aquí para responder tus preguntas y compartir esperanza juntos.</p>
            <div className="button-row">
              <Link className="btn black" href="/contacto/">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
