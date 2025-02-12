import { GetStaticProps, GetStaticPaths } from "next";
import { getAllBlogs, getBlogBySlug } from "@lib/getBlogs";
import { BlogPostProps } from "@commons/interfaces/blog";

export default function BlogPost({
  title,
  date,
  content,
  author,
  featured_image,
}: BlogPostProps) {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p>by {author}</p>
      <p className="text-gray-500 text-sm">{new Date(date).toDateString()}</p>
      <article
        className="mt-6 prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  );
}

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
