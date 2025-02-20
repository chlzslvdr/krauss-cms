import { GetStaticProps } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getAllBlogs } from "@lib/getBlogs";
import { BlogProps } from "@commons/interfaces/blog";
import SEO from "@components/SEO/index";

const Blogs = ({ blogs }: BlogProps) => {
  return (
    <>
      <SEO title="Blogs" />
      <section className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-green-primary mb-8">
          My Blogs
        </h1>

        <div className="grid gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.slug}
              className="bg-white shadow-lg rounded-xl p-6 transition hover:shadow-xl border-l-4 border-green-primary"
            >
              <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-2xl font-semibold text-green-primary hover:underline cursor-pointer">
                  {blog.title}
                </h2>
              </Link>

              <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                <Icon
                  icon="mdi:calendar"
                  className="text-lg text-green-primary"
                />
                {blog.date}
              </p>

              {blog.excerpt && (
                <p className="text-gray-700 mt-2">{blog.excerpt}</p>
              )}

              <div className="mt-4">
                <Link href={`/blog/${blog.slug}`}>
                  <span className="inline-block text-green-primary hover:text-green-secondary font-medium">
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
