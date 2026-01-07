import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.SITE_URL || 'https://nuestraesperanza.cl';

export const metadata: Metadata = {
  title: {
    default: 'Nuestra Esperanza',
    template: '%s | Nuestra Esperanza',
  },
  description:
    'Ministerio Nuestra Esperanza — recursos accesibles, comunidad y esperanza para personas con discapacidad visual.',
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>
          <header className="nav">
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                fontSize: '16.7px',
                lineHeight: '25.9px',
                letterSpacing: '0px',
                color: '#111111',
              }}
            >
              <img
                src="/images/ne-icon-2025-2.png"
                alt="Nuestra Esperanza logo"
                style={{ width: '28px', height: '28px', objectFit: 'contain' }}
              />
              Nuestra esperanza
            </a>
            <nav>
              <a href="/ultimas-publicaciones/">Blog</a>
              <a href="/recursos/">Recursos</a>
              <a href="/historia/">Historia</a>
              <a href="/contacto/">Contacto</a>
              <a href="/donar/">Donar</a>
            </nav>
          </header>
          <div className="shell">{children}</div>
          <footer className="footer">
            <div className="footer-grid">
              <div>
                <div style={{ fontWeight: 800, color: '#0b4da5', marginBottom: '0.35rem' }}>Nuestra esperanza</div>
                <div style={{ margin: 0, color: '#475569' }}>
                  Compartiendo la esperanza de Jesús con personas ciegas y con baja visión.
                </div>
              </div>
              <div>
                <h4>Esperanza</h4>
                <nav>
                  <a href="/ultimas-publicaciones/">Blog</a>
                  <a href="/recursos/">Recursos</a>
                  <a href="/historia/">Historia</a>
                  <a href="/contacto/">Contacto</a>
                  <a href="/donar/">Donar</a>
                </nav>
              </div>
              <div>
                <h4>Privacidad</h4>
                <nav>
                  <a href="/politica-de-privacidad/">Política de privacidad</a>
                  <a href="/terminos-y-condiciones/">Términos y condiciones</a>
                </nav>
              </div>
              <div>
                <h4>Redes sociales</h4>
                <nav>
                  <a href="#">Facebook</a>
                  <a href="https://www.instagram.com/nuestraesperanzachile/">Instagram</a>
                </nav>
              </div>
            </div>
            <div style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.95rem' }}>
              Corporación Nuestra Esperanza, 2025.
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
