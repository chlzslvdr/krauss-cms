import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import isEmpty from "lodash/isEmpty";

interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface OpenGraph {
  title?: string;
  description?: string;
  url?: string;
  images?: OpenGraphImage[];
}

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: OpenGraph;
}

const SEO = ({ title, description, canonical, openGraph }: SEOProps) => {
  const SEOTitle = !isEmpty(title) ? `${title} | Krauss` : "Tabitha Krauss";

  return (
    <Head>
      {generateNextSeo({
        title: SEOTitle,
        description,
        canonical,
        openGraph,
      })}
    </Head>
  );
};

export default SEO;
