import Link from 'next/link';
import { getAllContentMeta } from '@/lib/content';

export default async function HomePage() {
  const items = await getAllContentMeta();
  const sorted = items.sort((a, b) => (a.slug > b.slug ? 1 : -1));

  return (
    <section>
      <h2>Contenido</h2>
      <ul>
        {sorted.map((item) => (
          <li key={item.slug} style={{ marginBottom: '0.5rem' }}>
            <Link href={`/${item.slug}/`}>
              <strong>{item.title}</strong>
            </Link>
            <div style={{ color: '#52606d' }}>{item.description}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
