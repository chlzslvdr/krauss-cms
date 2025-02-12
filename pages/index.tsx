import React from "react";
import Link from "next/link";
import filter from "lodash/filter";
import { attributes } from "@content/home.md";
import { HomeAttributes } from "@commons/interfaces/home";
import SEO from '@components/SEO/index';


const Home = () => {
  const { name, subtitle, social_links, navigations } =
    attributes as HomeAttributes;

  const filteredNavItems = filter(navigations, { is_show: true });
  const filteredSocialLinkItems = filter(social_links, { is_show: true });

  return (
    <>
      <SEO title="Home" />

      <h2>Navigations:</h2>
      {filteredNavItems.map((nav, index) => (
        <Link key={index} href={nav.link}>
          {nav.page}
        </Link>
      ))}

      <h2>Social Links:</h2>
      {filteredSocialLinkItems.map((social, index) => (
        <Link key={index} href={social.url} legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
          >
            <i className={social.icon_class} />
          </a>
        </Link>
      ))}
    </>
  );
};

export default Home;
