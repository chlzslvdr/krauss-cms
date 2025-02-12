export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  featured_image?: string;
  is_show: boolean;
};

export type BlogProps = {
  blogs: BlogPost[];
};

export type BlogPostProps = {
  title: string;
  date: string;
  content: string;
  author: string;
  featured_image?: string;
};
