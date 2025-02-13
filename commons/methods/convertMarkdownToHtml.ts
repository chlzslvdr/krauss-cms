import { remark } from "remark";
import html from "remark-html";

/**
 * Converts Markdown string to HTML
 * @param markdown Markdown content
 * @returns HTML string
 */
export const convertMarkdownToHtml = async (
  markdown: string
): Promise<string> => {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
};
