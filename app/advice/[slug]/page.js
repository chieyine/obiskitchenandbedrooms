import { getPosts, getPostBySlug } from "../../../lib/wordpress";
import { absoluteUrl } from "../../../lib/site";
import { notFound } from "next/navigation";
import SinglePostExperience from "../../components/SinglePostExperience";
import GlobalNav from "../../components/GlobalNav";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const image = post.image ? absoluteUrl(post.image) : undefined;
  const url = `https://obiskitchenbedrooms.co.uk/advice/${post.slug}`;

  return {
    title: `${post.title} | Obi's Kitchen & Bedrooms`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Obi's Kitchen & Bedrooms`,
      description: post.excerpt,
      url,
      images: image ? [{ url: image }] : [],
      type: "article",
    },
  };
}

export default async function SingleAdvicePage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://obiskitchenbedrooms.co.uk/advice/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [absoluteUrl(post.image)] : undefined,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Obi's Kitchen & Bedrooms",
    },
    publisher: {
      "@type": "Organization",
      name: "Obi's Kitchen & Bedrooms",
    },
  };

  return (
    <main className="bg-background min-h-screen" data-cursor-label="Read" data-cursor-tone="light">
      <GlobalNav theme="transparent" />

      <SinglePostExperience post={post} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

