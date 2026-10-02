import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { BlogLayout } from "@/components/blog-layout";
import { getBlogPosts } from "@/lib/content.functions";
import { buildPageSeo } from "@/lib/seo";

const blogIndexDescription =
  "Guides on SEO and AI search visibility (GEO) from Findable, in English, Spanish and Polish: Google rankings, ChatGPT and AI Overviews citations, and SEO with AI agents.";

const LANGUAGE_SECTIONS = [
  { lang: "es", label: "Español" },
  { lang: "en", label: "English" },
  { lang: "pl", label: "Polski" },
] as const;

export const Route = createFileRoute("/blogs/")({
  head: () =>
    buildPageSeo({
      title: "Findable Blog",
      description: blogIndexDescription,
      path: "/blogs",
    }),
  component: BlogIndex,
  loader: async () => await getBlogPosts(),
});

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <BlogLayout>
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-24">
        <p className="text-sm font-medium text-[var(--color-brand-accent)]">
          Resources
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
          Blog
        </h1>

        {posts.length === 0 ? (
          <p className="mt-8 text-[var(--color-brand-muted)]">
            No posts yet. Check back soon.
          </p>
        ) : (
          LANGUAGE_SECTIONS.map(({ lang, label }) => {
            const sectionPosts = posts.filter((post) => post.lang === lang);
            if (sectionPosts.length === 0) return null;
            return (
              <section key={lang} lang={lang} className="mt-12">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-muted)]">
                  {label}
                </h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {sectionPosts.map((post) => (
                    <article key={post.url}>
                      <Link
                        to="/blogs/$"
                        params={{ _splat: post.slugs.join("/") }}
                        className="group block h-full rounded-lg border border-[var(--color-border-subtle)] bg-white p-6 transition-colors hover:border-neutral-900"
                      >
                        <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 transition-colors group-hover:text-[var(--color-brand-accent)]">
                          {post.title}
                        </h3>
                        {post.description && (
                          <p className="mt-3 text-sm leading-6 text-[var(--color-brand-muted)]">
                            {post.description}
                          </p>
                        )}
                        <p className="mt-5 text-sm font-medium text-neutral-950">
                          {lang === "es"
                            ? "Leer artículo"
                            : lang === "pl"
                              ? "Czytaj artykuł"
                              : "Read post"}{" "}
                          <span aria-hidden="true">&rarr;</span>
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })
        )}

        <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-8">
          <SiteFooter className="text-xs text-neutral-600 [&_a]:transition-colors [&_a]:hover:text-neutral-900" />
        </div>
      </div>
    </BlogLayout>
  );
}
