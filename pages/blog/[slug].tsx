import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { getAllBlogs, getBlogBySlug } from "@lib/getBlogs";
import { BlogPostProps } from "@commons/interfaces/blog";
import SEO from "@components/SEO/index";
import { getImageSrc } from "@commons/methods/getImageSrc";

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  date,
  content,
  author,
  featured_image,
  excerpt,
}) => {
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
                ? getImageSrc(featured_image)
                : "https://chlzslvdr.sirv.com/krauss/default.jpg",
            },
          ],
        }}
      />

      <main className="max-w-3xl mx-auto p-6">
        {featured_image && (
          <div className="mb-6">
            <img
              alt={title}
              src={getImageSrc(featured_image)}
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-2">{title}</h1>

        <div className="flex items-center space-x-4 text-gray-600">
          <p className="text-lg font-medium">By {author}</p>
          <span>•</span>
          <p className="text-sm">{date}</p>
        </div>

        <article
          className="mt-6 prose prose-lg max-w-none leading-relaxed text-gray-800 [&>p]:mb-4 [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-8">
          <Link href="/blogs">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
              ← Back to Blog
            </button>
          </Link>
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
