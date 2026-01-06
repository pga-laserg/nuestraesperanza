import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.SITE_URL || 'https://nuestraesperanza.cl';

export const metadata: Metadata = {
  title: {
    default: 'Nuestra Esperanza',
    template: '%s | Nuestra Esperanza',
  },
  description: 'Ministerio Nuestra Esperanza — recursos accesibles, comunidad y esperanza para personas con discapacidad visual.',
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <main>
          <header>
            <h1>Nuestra Esperanza</h1>
            <nav>
              <a href="/">Inicio</a>
              <a href="/historia/">Historia</a>
              <a href="/recursos/">Recursos</a>
              <a href="/contacto/">Contacto</a>
            </nav>
          </header>
          {children}
          <footer>
            <p>Contenido generado estáticamente desde Markdown.</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
