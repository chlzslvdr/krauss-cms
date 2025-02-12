import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllBlogs } from "@lib/getBlogs";
import { BlogProps } from "@commons/interfaces/blog";

const Blogs = ({ blogs }: BlogProps) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.slug} className="border-b pb-4">
            <Link href={`/blog/${blog.slug}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {blog.title}
              </h2>
            </Link>
            <p className="text-gray-600 text-sm">
              {new Date(blog.date).toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { blogs: getAllBlogs() },
  };
};
