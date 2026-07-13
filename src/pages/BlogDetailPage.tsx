import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LuArrowRight, LuArrowUpRight, LuList } from "react-icons/lu";
import useSeo from "../hooks/useSeo";
import FadeIn from "../components/FadeIn/FadeIn";
import BlogShare from "../components/BlogShare/BlogShare";
import BlogHero from "../components/BlogHero/BlogHero";
import {
  blogPosts,
  blogPostsBySlug,
  type BlogBlock,
} from "../data/blogContent";
import { WHATSAPP_NUMBER } from "../data/faqContent";
import { blogOgImageUrl } from "../seo/getSeoForPath";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Anchor id for a heading, so the sidebar contents can jump to it. */
function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Each block eases up as it enters the viewport. Kept small — this is body copy,
 *  not a landing page, so the motion should be barely noticed. */
const REVEAL = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px 0px" },
  transition: { duration: 0.5, ease: EASE },
} as const;

function ContentBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <motion.h2
          {...REVEAL}
          id={headingId(block.text)}
          style={{ scrollMarginTop: 110 }}
          className="mt-12 flex items-center gap-3 text-xl font-bold text-slate-900 md:text-2xl"
        >
          <span
            className="h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#EAC117] to-[#D97706]"
            aria-hidden="true"
          />
          {block.text}
        </motion.h2>
      );
    case "paragraph":
      return (
        <motion.p
          {...REVEAL}
          className="mt-4 max-w-[70ch] text-[15px] leading-8 text-slate-700 md:text-base"
        >
          {block.text}
        </motion.p>
      );
    case "list":
      return (
        <motion.ul {...REVEAL} className="mt-5 grid max-w-[70ch] gap-2.5">
          {block.items.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px 0px" }}
              transition={{ duration: 0.4, ease: EASE, delay: index * 0.05 }}
              className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-3 text-[14px] leading-7 text-slate-700 transition-colors duration-300 hover:border-amber-200 hover:bg-amber-50/50"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      );
    case "quote":
      return (
        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mt-8 max-w-[70ch] overflow-hidden rounded-2xl border-l-4 border-amber-400 bg-amber-50/60 py-5 pl-6 pr-5 text-[16px] font-medium italic leading-8 text-slate-800 md:text-[17px]"
        >
          <span
            className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.18),transparent_70%)] blur-xl"
            aria-hidden="true"
          />
          <span className="relative">{block.text}</span>
        </motion.blockquote>
      );
  }
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = slug ? blogPostsBySlug[slug] : undefined;

  useSeo({
    title: post
      ? `${post.title} | MechCurve Blog`
      : "Article Not Found | MechCurve",
    description: post
      ? post.excerpt
      : "The requested article was not found. Browse all engineering articles from MechCurve.",
    path: post ? `/blog/${post.slug}` : "/blog",
    robots: post ? "index, follow" : "noindex, follow",
    image: post ? blogOgImageUrl(post.slug) : undefined,
    type: post ? "article" : "website",
  });

  if (!post) {
    return (
      <section className="site-light-content px-5 pb-16 pt-32 sm:px-8 md:px-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Article Not Found
          </h1>
          <p className="mt-3 text-slate-600">
            This article is unavailable. You can return to the blog and browse
            the other posts.
          </p>
          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-5 py-3 text-sm font-bold text-[#06080D] shadow-[0_10px_28px_rgba(234,193,23,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Go To Blog
            <LuArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);
  const sections = post.content.filter(
    (block): block is Extract<BlogBlock, { type: "heading" }> =>
      block.type === "heading",
  );

  return (
    <div className="site-light-content">
      {/* ── Hero: cover photo as the background, title over it ── */}
      <BlogHero post={post} />

      {/* ── Article + sidebar ── */}
      <section
        className="px-5 pb-20 pt-14 sm:px-8 md:px-12"
        aria-label="Article"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          {/* Body — the excerpt now leads the hero, so it is not repeated here. */}
          <article>
            {post.content.map((block, index) => (
              <ContentBlock key={index} block={block} />
            ))}

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share — repeated here for readers who never look at the sidebar */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 lg:hidden">
              <BlogShare post={post} />
            </div>
          </article>

          {/* Sidebar */}
          {/*
					  Pinned for the whole article: the sidebar stays on screen while only
					  the article scrolls. It can be taller than the viewport, so it is
					  capped to the visible height and scrolls internally — otherwise the
					  CTA at its foot could never be reached.
					*/}
          <aside
            // Lenis (smooth scroll) captures the wheel globally; without this
            // attribute it would scroll the page instead of the sidebar's own
            // overflow, making the lower cards unreachable.
            data-lenis-prevent
            className="blog-aside self-start lg:sticky lg:top-24 lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto lg:pr-1"
          >
            <div className="space-y-5">
              {sections.length > 0 && (
                <nav
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)]"
                  aria-label="Table of contents"
                >
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    <LuList size={13} />
                    Contents
                  </p>
                  <ul className="mt-3 space-y-1">
                    {sections.map((section) => (
                      <li key={section.text}>
                        <a
                          href={`#${headingId(section.text)}`}
                          className="block rounded-lg px-2.5 py-2 text-[13px] font-medium leading-6 text-slate-600 transition-colors duration-200 hover:bg-amber-50 hover:text-amber-700"
                        >
                          {section.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] lg:block">
                <BlogShare post={post} variant="compact" />
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-[0_18px_44px_rgba(15,23,42,0.2)]">
                <div
                  className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.22),transparent_70%)] blur-2xl"
                  aria-hidden="true"
                />
                <h2 className="relative text-base font-bold text-white">
                  Have a project in mind?
                </h2>
                <p className="relative mt-2 text-[13px] leading-6 text-slate-300">
                  Talk to an engineer about your design, prototyping, or
                  documentation requirements.
                </p>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-4 py-2.5 text-sm font-bold text-[#06080D]"
                >
                  Request a Consultation
                  <LuArrowRight size={15} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Keep reading ── */}
      {relatedPosts.length > 0 && (
        <section
          className="border-t border-slate-200 bg-slate-50/60 px-5 py-14 sm:px-8 md:px-12"
          aria-label="More articles"
        >
          <div className="mx-auto max-w-[1440px]">
            <FadeIn>
              <h2 className="text-xl font-bold text-slate-900">Keep Reading</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700">
                      {related.category}
                    </span>
                    <span className="mt-2 flex items-start justify-between gap-3">
                      <span className="text-[15px] font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-amber-700">
                        {related.title}
                      </span>
                      <LuArrowUpRight
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600"
                      />
                    </span>
                    <span className="mt-2 text-[13px] leading-6 text-slate-600">
                      {related.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  );
}
