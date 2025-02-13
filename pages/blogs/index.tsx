import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllBlogs } from "@lib/getBlogs";
import { BlogProps } from "@commons/interfaces/blog";
import SEO from "@components/SEO/index";

const Blogs = ({ blogs }: BlogProps) => {
  return (
    <>
      <SEO title="Blogs" />
      <section className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Blogs</h1>

        <div className="grid gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              className="bg-white shadow-lg rounded-xl p-6 transition hover:shadow-xl"
            >
              <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline cursor-pointer">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mt-2">{blog.date}</p>

              {blog.excerpt && (
                <p className="text-gray-700 mt-2">{blog.excerpt}</p>
              )}

              <div className="mt-4">
                <Link href={`/blog/${blog.slug}`}>
                  <span className="inline-block text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { blogs: getAllBlogs() },
  };
};
