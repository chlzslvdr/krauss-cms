import { marked } from "marked";

/**
 * Converts Markdown string to HTML
 * @param markdown Markdown content
 * @returns HTML string
 */
export const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
  return marked(markdown);
};
