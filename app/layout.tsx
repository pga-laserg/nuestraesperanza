import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next";
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
                    href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <main>
                    <header className="nav">
                        <Link href="/" className="logo">
                            <img
                                src="/images/ne-icon-2025-2.png"
                                alt="Logo Nuestra Esperanza"
                                style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                            />
                            <span>Nuestra esperanza</span>
                        </Link>
                        <nav>
                            <Link href="/ultimas-publicaciones/">Blog</Link>
                            <Link href="/recursos/">Recursos</Link>
                            <Link href="/historia/">Historia</Link>
                            <Link href="/contacto/">Contacto</Link>
                        </nav>
                    </header>

                    {children}

                    <footer className="footer">
                        <div className="container">
                            <div className="footer-grid">
                                <div className="footer-brand">
                                    <img
                                        src="/images/ne-icon-2025-2.png"
                                        alt="Colección de puntos braille"
                                        style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '1.5rem' }}
                                    />
                                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#111', marginBottom: '1rem', fontSize: '1.25rem' }}>
                                        Nuestra esperanza
                                    </div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#666' }}>
                                        Compartiendo la esperanza de Jesús con personas ciegas y con baja visión.
                                    </p>
                                </div>
                                <div>
                                    <h4>Ministerio</h4>
                                    <nav>
                                        <Link href="/ultimas-publicaciones/">Blog</Link>
                                        <Link href="/recursos/">Recursos</Link>
                                        <Link href="/historia/">Historia</Link>
                                    </nav>
                                </div>
                                <div>
                                    <h4>Soporte</h4>
                                    <nav>
                                        <Link href="/contacto/">Contacto</Link>
                                        <Link href="/politica-de-privacidad/">Privacidad</Link>
                                    </nav>
                                </div>
                                <div>
                                    <h4>Redes Sociales</h4>
                                    <nav>
                                        <a href="https://www.facebook.com/nuestraesperanzachile" target="_blank" rel="noopener noreferrer">Facebook</a>
                                        <a href="https://www.instagram.com/nuestraesperanzachile/" target="_blank" rel="noopener noreferrer">Instagram</a>
                                    </nav>
                                </div>
                            </div>
                            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', color: 'var(--text-light)', fontSize: '0.85rem', textAlign: 'center' }}>
                                &copy; {new Date().getFullYear()} Corporación Nuestra Esperanza.
                            </div>
                        </div>
                    </footer>
                </main>
                <Analytics />
            </body>
        </html>
    );
}
