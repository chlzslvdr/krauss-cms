import { NextSeo } from "next-seo";
import isEmpty from "lodash/isEmpty";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
  };
}

const SEO = ({ title, description, canonical, openGraph }: SEOProps) => {
  const SEOTitle = !isEmpty(title) ? `${title} | Krauss` : "Tabitha Krauss";

  return (
    <NextSeo
      title={SEOTitle}
      description={description}
      canonical={canonical}
      openGraph={openGraph}
    />
  );
};

export default SEO;
