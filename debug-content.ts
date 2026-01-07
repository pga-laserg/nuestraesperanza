import { getAllContentMeta } from './lib/content';

async function test() {
    const meta = await getAllContentMeta();
    console.log('Discovered Slugs:', meta.map(m => m.slug));
}

test().catch(console.error);
