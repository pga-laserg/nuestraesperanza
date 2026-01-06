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

export default async function HomePage() {
  const items = await getAllContentMeta();
  const posts = items.filter((i) => i.type === 'post');
  posts.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));

  return (
    <>
      <section className="hero">
        <div>
          <h1>Compartiendo la esperanza de Jesús con personas ciegas y de baja visión</h1>
          <p>Desde 2003, llevamos el evangelio y literatura accesible a personas con discapacidad visual en Chile.</p>
          <div className="button-row">
            <Link className="btn primary" href="#sobre-nosotros">
              Conozca más
            </Link>
            <Link className="btn ghost" href="/recursos/">
              Recursos
            </Link>
          </div>
        </div>
        <div>
          <img
            src="/images/blind-person-with-cane.jpeg"
            alt="Mujer con bastón y audífonos en un parque"
            style={{ borderRadius: '18px', boxShadow: '0 18px 45px rgba(0,0,0,0.18)' }}
          />
        </div>
      </section>

      <section className="section" id="sobre-nosotros">
        <div className="info-row">
          <div>
            <h2>Dos décadas de servicio inclusivo en Chile</h2>
            <p style={{ marginTop: 0 }}>
              Por más de 20 años nuestra labor se ha concentrado en promover la igualdad de derechos y oportunidades,
              reflejando el amor de Cristo en cada acción.
            </p>
            <div className="card-grid">
              {pillars.map((pillar) => (
                <div className="card" key={pillar.title}>
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
              style={{ borderRadius: '16px', boxShadow: '0 14px 35px rgba(0,0,0,0.14)' }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="info-row">
          <div>
            <h2>Comprometidos con la inclusión</h2>
            <p style={{ marginTop: 0 }}>
              Nuestra Esperanza es una corporación laica integrada por miembros de la Iglesia Adventista del Séptimo Día
              comprometidos con el desarrollo integral de personas con discapacidad visual.
            </p>
            <div className="card-grid">
              {missionVision.map((item) => (
                <div className="card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="/images/DSCN3854-scaled.jpg"
              alt="Participante usando laptop"
              style={{ borderRadius: '16px', boxShadow: '0 14px 35px rgba(0,0,0,0.14)' }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="blockquote">
          <p style={{ margin: 0, fontWeight: 600 }}>
            «Para los ciegos fui sus ojos; para los cojos, sus pies.»
          </p>
          <p style={{ margin: '0.35rem 0 0', color: '#475569' }}>Job 29:14-15 · Nueva Versión Internacional</p>
        </div>
      </section>

      <section className="section">
        <h2>Últimas publicaciones</h2>
        <div className="card-grid">
          {posts.map((post) => (
            <div className="card post-card" key={post.slug}>
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  style={{ borderRadius: '12px', objectFit: 'cover', width: '100%', height: '100%' }}
                />
              ) : null}
              <div>
                <div className="badge">
                  {post.lastUpdated || 'Actual'} · {categoryForSlug(post.slug)}
                </div>
                <h3 style={{ marginTop: '0.35rem', marginBottom: '0.25rem' }}>
                  <Link href={`/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p style={{ margin: 0 }}>{post.description}</p>
              </div>
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
