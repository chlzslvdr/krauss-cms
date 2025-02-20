import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getAllBlogs, getBlogBySlug } from "@lib/getBlogs";
import { BlogPostProps } from "@commons/interfaces/blog";
import { getAssetsSrc } from "@commons/methods/getAssetsSrc";
import SEO from "@components/SEO/index";

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  date,
  content,
  author,
  featured_image,
  excerpt,
}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <>
      <SEO
        title={title}
        description={excerpt}
        openGraph={{
          images: [
            {
              alt: title,
              url: featured_image
                ? getAssetsSrc(featured_image)
                : "https://chlzslvdr.sirv.com/krauss/default.jpg",
            },
          ],
        }}
      />

      <main className="max-w-3xl mx-auto p-6">
        {featured_image && (
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
            <img
              alt={title}
              src={getAssetsSrc(featured_image)}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold text-green-primary mb-3">{title}</h1>

        <div className="flex items-center space-x-4 text-gray-600">
          <p className="text-lg font-semibold">By {author}</p>
          <span className="text-gray-400">•</span>
          <p className="text-sm flex items-center gap-2">{date}</p>
        </div>

        <article
          className="mt-6 prose prose-lg max-w-none leading-relaxed text-gray-800 [&>p]:mb-4 [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-8">
          <Link href="/blogs">
            <button className="bg-green-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition flex items-center gap-2">
              <Icon icon="mdi:arrow-left" className="text-xl" />
              Back to Blogs
            </button>
          </Link>
        </div>

        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-3">Share this post:</h3>
          <div className="flex gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-primary hover:text-light-dark transition"
            >
              <Icon icon="mdi:facebook" className="text-2xl" />
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                currentUrl
              )}&title=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-primary hover:text-light-dark transition"
            >
              <Icon icon="mdi:linkedin" className="text-2xl" />
              LinkedIn
            </a>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 text-gray-600 hover:text-light-dark transition cursor-pointer"
            >
              <Icon icon="mdi:content-copy" className="text-2xl" />
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogs();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }

  const blog = await getBlogBySlug(params.slug as string);

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: {
      title: blog.title,
      date: blog.date,
      content: blog.content,
      author: blog.author,
      featured_image: blog.featured_image || null,
      excerpt: blog.excerpt,
    },
  };
};
