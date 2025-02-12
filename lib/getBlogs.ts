import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost } from "@commons/interfaces/blog";
import generateSlug from "@commons/methods/generateSlug";

/**
 * Get all blog posts, filtering out hidden ones.
 */
export const getAllBlogs = (): BlogPost[] => {
  const files = fs.readdirSync(path.join("content/blog"));

  return files
    .map((filename) => {
      const filePath = path.join("content/blog", filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      if (!data.is_show) return null;

      const slug = filename.replace(".md", "") || generateSlug(data.title);

      return {
        slug,
        title: data.title,
        date: data.date ? new Date(data.date).toISOString() : null,
        author: data.author,
        featured_image: data.featured_image || null,
      };
    })
    .filter((post) => post !== null) as BlogPost[];
};

/**
 * Get a single blog post by slug.
 */
export const getBlogBySlug = async (slug: string) => {
  const filePath = path.join("content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  if (!data.is_show) return null;

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date ? new Date(data.date).toISOString() : null,
    author: data.author,
    featured_image: data.featured_image || null,
    content: contentHtml,
  };
};
