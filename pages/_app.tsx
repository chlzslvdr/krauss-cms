import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import SEO from "../next-seo.config";
import Layout from "@components/Layout/index";
import "@styles/globals.css";
import "@flaticon/flaticon-uicons/css/all/all.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <link
          rel="icon"
          href="https://chlzslvdr.sirv.com/krauss/logo.png"
          type="image/png"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
