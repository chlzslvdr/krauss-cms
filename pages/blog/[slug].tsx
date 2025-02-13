import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { getAllBlogs, getBlogBySlug } from "@lib/getBlogs";
import { BlogPostProps } from "@commons/interfaces/blog";

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  date,
  content,
  author,
  featured_image,
}) => {
  return (
    <main className="max-w-3xl mx-auto p-6">
      {featured_image && (
        <div className="mb-6">
          <img
            src={`/static/${featured_image}`}
            alt={title}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-2">{title}</h1>

      <div className="flex items-center space-x-4 text-gray-600">
        <p className="text-lg font-medium">By {author}</p>
        <span>•</span>
        <p className="text-sm">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(date))}
        </p>
      </div>

      <article
        className="mt-6 prose prose-lg max-w-none leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Back to Blog Button */}
      <div className="mt-8">
        <Link href="/blogs">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            ← Back to Blog
          </button>
        </Link>
      </div>
    </main>
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
    },
  };
};