import Link from 'next/link';
import { getAllContentMeta } from '@/lib/content';

const pillars = [
  {
    title: 'Literatura accesible',
    desc: 'Producimos y facilitamos literatura en braille y formatos audibles.',
  },
  {
    title: 'Estudio de la Biblia',
    desc: 'Adaptamos cursos y organizamos una escuela bíblica virtual con encuentros semanales.',
  },
  {
    title: 'Eventos',
    desc: 'Encuentros nacionales, talleres de desarrollo personal e inclusión en iglesias locales.',
  },
];

const missionVision = [
  {
    title: 'Misión',
    desc: 'Producir y distribuir literatura cristiana en formatos accesibles que fortalezcan la fe y fomenten la inclusión.',
    image: '/images/Firefly-20241223185222.png',
  },
  {
    title: 'Visión',
    desc: 'Ser un puente de esperanza y fe para todas las personas con discapacidad visual en Chile y más allá.',
    image: '/images/DSCN3765-scaled.jpg',
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
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default async function HomePage() {
  const items = await getAllContentMeta();
  const posts = items.filter((i) => i.type === 'post');
  posts.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));

  return (
    <>
      <section className="hero">
        <div>
          <h1 className="cardo-regular-italic">Compartiendo la esperanza de Jesús con personas ciegas y de baja visión</h1>
          <p>Desde 2003, llevamos el evangelio y literatura accesible a personas con discapacidad visual en Chile.</p>
          <div className="button-row">
            <Link className="btn primary" href="#sobre-nosotros">
              Conozca más
            </Link>
          </div>
        </div>
        <img
          src="/images/Firefly-20241223185222.png"
          alt="Mujer con bastón en parque con audífonos"
          style={{ borderRadius: '12px', width: '100%', maxWidth: '960px' }}
        />
      </section>

      <section className="section" id="sobre-nosotros">
        <div className="info-row">
          <div>
            <h2>Dos décadas de servicio inclusivo en Chile</h2>
            <p style={{ marginTop: 0 }}>
              Por más de 20 años nuestra labor se ha concentrado en promover la igualdad de derechos y oportunidades,
              reflejando el amor de Cristo en cada acción.
            </p>
            <div className="feature-grid">
              {pillars.map((pillar) => (
                <div className="feature" key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="/images/ne-30-scaled.jpg"
              alt="Actividades en grupo de Nuestra Esperanza"
              style={{ borderRadius: '6px' }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Comprometidos con la inclusión</h2>
        <p style={{ marginTop: 0 }}>
          Nuestra Esperanza es una corporación laica integrada por miembros de la Iglesia Adventista del Séptimo Día
          comprometidos con el desarrollo integral de personas con discapacidad visual.
        </p>
        {missionVision.map((item, idx) => (
          <div className="info-row" key={item.title} style={{ marginTop: '1rem' }}>
            {idx % 2 === 0 ? (
              <>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div>
                  <img src={item.image} alt={item.title} style={{ borderRadius: '6px' }} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <img src={item.image} alt={item.title} style={{ borderRadius: '6px' }} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      <section className="blockquote">
        <p style={{ margin: 0, fontWeight: 600, fontSize: '1.2rem' }}>
          «De justicia y rectitud me revestí; ellas eran mi manto y mi turbante.
        </p>
        <p style={{ margin: '0.35rem 0 0', fontWeight: 600, fontSize: '1.2rem' }}>
          Para los ciegos fui sus ojos; para los cojos, sus pies.»
        </p>
        <p style={{ margin: '0.35rem 0 0', color: '#d1d5db', fontStyle: 'italic' }}>Job 29:14-15</p>
        <p style={{ margin: '0.1rem 0 0', color: '#d1d5db', fontStyle: 'italic' }}>Nueva Versión Internacional</p>
      </section>

      <section className="section">
        <h2>Últimas publicaciones</h2>
        <div className="post-list">
          {posts.map((post, idx) => (
            <div className="post-item" key={post.slug}>
              <h3 style={{ margin: 0 }}>
                <Link href={`/${post.slug}/`}>{post.title}</Link>
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', color: '#475569' }}>
                <span className="badge">{categoryForSlug(post.slug)}</span>
                {post.lastUpdated && <span>{formatDate(post.lastUpdated)}</span>}
                <span>—</span>
                <span>por Froilán Gallardo</span>
              </div>
              <p style={{ margin: 0 }}>{post.description}</p>
              {idx < posts.length - 1 && (
                <span style={{ height: '1px', background: 'rgba(0,0,0,0.08)', width: '100%' }} />
              )}
            </div>
          ))}
          {posts.length === 0 && <p>No hay publicaciones disponibles.</p>}
        </div>
      </section>

      <section className="section">
        <h2>Conéctate con nosotros</h2>
        <p style={{ marginTop: 0 }}>Estamos aquí para responder tus preguntas y compartir esperanza juntos.</p>
        <div className="button-row">
          <Link className="btn primary" href="/contacto/">
            Contacto
          </Link>
          <Link className="btn ghost" href="/donar/">
            Donar
          </Link>
        </div>
      </section>
    </>
  );
}
