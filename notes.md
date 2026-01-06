Reframe, simplify, redirect (execution plan)

1️⃣ Define the new canonical URL (before touching content)

Your new permanent rule:

/{slug}/

No dates. No categories in URL. One concept = one URL.

Example:

OLD: /2026/01/06/pagina-ejemplo/
NEW: /pagina-ejemplo/

Write this down — this is now law.

⸻

2️⃣ Reframe the content (light, not a rewrite)

You don’t need to overwork it. Do just enough to remove “datedness”.

Minimum changes (15–30 min per page)
	•	Remove date references (“this year”, “recently”, etc.)
	•	Update intro paragraph to be timeless
	•	Check headings (H1/H2)
	•	Keep the core content
	•	Optional: add a short “Updated” note at bottom

You’re not chasing rankings — you’re making it evergreen.

⸻

3️⃣ Extract content to Markdown (recommended)

Export from WordPress → Markdown.

Each page:

---
title: "Página Ejemplo"
slug: "pagina-ejemplo"
description: "Descripción clara y atemporal"
lastUpdated: "2026-01-06"
---

Evergreen content here…

Why Markdown?
	•	Clean Git history
	•	Easy to refactor later
	•	Zero runtime CMS dependency

⸻

4️⃣ Implement the page in Next.js

App Router pattern:

app/[slug]/page.tsx

Static generation:
	•	generateStaticParams()
	•	Build-time rendering
	•	Fast + cheap on Vercel

SEO:
	•	<title> = page title
	•	<meta description>
	•	Canonical → /pagina-ejemplo/

⸻

5️⃣ Redirect old URLs → new (even if you “don’t care”)

This is where Option C shines.

Single global rule (recommended)

In vercel.json:

{
  "redirects": [
    {
      "source": "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/",
      "destination": "/:slug/",
      "permanent": true
    }
  ]
}

This:
	•	Preserves any residual value
	•	Prevents crawl errors
	•	Costs nothing to maintain

You can remove it in a year if you want.

⸻

6️⃣ Canonical + sitemap (important)

Make sure:
	•	Canonical points to /pagina-ejemplo/
	•	Sitemap only includes new URLs
	•	Old date URLs never appear again

This tells Google clearly:

“This content moved and lives here now.”

⸻

7️⃣ Test before killing WordPress

Before shutdown:
	1.	Visit old URL:

/2026/01/06/pagina-ejemplo/

✅ Should redirect to /pagina-ejemplo/

	2.	New URL:
	•	Loads fast
	•	Correct title/meta
	•	Canonical correct
	3.	Search Console (later):
	•	No soft 404s
	•	Redirects recognized

⸻

8️⃣ After launch (2–4 weeks later)

Optional cleanup:
	•	Remove redirect rule if you truly want old URLs gone
	•	Or keep it forever (no downside)