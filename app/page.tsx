import Link from 'next/link';
import { getAllContentMeta } from '@/lib/content';

const pillars = [
  { title: 'Literatura accesible', desc: 'Materiales en braille y audio para fortalecer la fe.' },
  { title: 'Estudio de la Biblia', desc: 'Cursos y encuentros virtuales con lecturas adaptadas.' },
  { title: 'Eventos', desc: 'Encuentros, talleres y espacios de inclusión en comunidad.' },
];

const missionVision = [
  {
    title: 'Misión',
    desc: 'Producir y distribuir literatura cristiana accesible que fortalezca la fe y fomente la inclusión.',
  },
  {
    title: 'Visión',
    desc: 'Ser un puente de esperanza para personas con discapacidad visual en Chile y más allá.',
  },
];

export default async function HomePage() {
  const items = await getAllContentMeta();
  const posts = items.filter((i) => i.type === 'post');
  posts.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''));

  return (
    <>
      <section className="hero">
        <div>
          <h1>Compartiendo la esperanza de Jesús con personas ciegas y de baja visión</h1>
          <p>Recursos accesibles, comunidad y acompañamiento desde 2003.</p>
          <div className="chip-row">
            <span className="chip">Braille</span>
            <span className="chip">Audio</span>
            <span className="chip">Formación bíblica</span>
            <span className="chip">Eventos inclusivos</span>
          </div>
          <div className="button-row">
            <Link className="btn primary" href="/historia/">
              Ver historia
            </Link>
            <Link className="btn ghost" href="/recursos/">
              Ver recursos
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

      <section className="section">
        <h2>Dos décadas de servicio inclusivo</h2>
        <div className="card-grid">
          {pillars.map((pillar) => (
            <div className="card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
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
                <div className="badge">{post.lastUpdated || 'Actual'}</div>
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
        <h2>Comprometidos con la inclusión</h2>
        <div className="card-grid">
          {missionVision.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
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
        <h2>Conéctate con nosotros</h2>
        <p style={{ marginTop: 0 }}>Estamos aquí para responder tus preguntas y compartir esperanza juntos.</p>
        <div className="button-row">
          <Link className="btn primary" href="/contacto/">
            Ir a contacto
          </Link>
          <Link className="btn ghost" href="/donar/">
            Donar
          </Link>
        </div>
      </section>
    </>
  );
}
