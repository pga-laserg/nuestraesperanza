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
      <body>
        <main>
          <div className="nav">
            <a href="/" style={{ fontWeight: 800, letterSpacing: '-0.02em', color: '#0b4da5' }}>
              Nuestra Esperanza
            </a>
            <div>
              <a href="/historia/">Historia</a>
              <a href="/recursos/">Recursos</a>
              <a href="/contacto/">Contacto</a>
              <a href="/donar/">Donar</a>
            </div>
          </div>
          <div className="shell">{children}</div>
          <footer className="footer">
            Corporación Nuestra Esperanza · Contenido estático en Markdown ·{' '}
            <a href="/politica-de-privacidad/">Privacidad</a> · <a href="/terminos-y-condiciones/">Términos</a>
          </footer>
        </main>
      </body>
    </html>
  );
}
