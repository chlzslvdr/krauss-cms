import { AppProps } from "next/app";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import SEOConfig from "../../next-seo.config";
import Layout from "@components/Layout/index";
import "@styles/globals.css";
import "@flaticon/flaticon-uicons/css/all/all.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="https://chlzslvdr.sirv.com/krauss/logo.png"
          type="image/png"
        />

        {generateNextSeo(SEOConfig)}
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
