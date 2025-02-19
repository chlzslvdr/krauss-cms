import React from "react";
import Link from "next/link";
import filter from "lodash/filter";
import { attributes } from "@contents/home.md";
import { HomeAttributes } from "@commons/interfaces/home";

const Home = () => {
  const { name, subtitle, social_links } = attributes as HomeAttributes;
  const filteredSocialLinks = filter(social_links, { is_show: true });

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900">{name}</h1>
        <p className="text-xl text-gray-600 mt-3">{subtitle}</p>

        <div className="flex gap-5 mt-6">
          {filteredSocialLinks.map((social) => (
            <Link key={social.platform} href={social.url} legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="text-3xl text-green-primary hover:text-green-secondary transition-transform transform hover:scale-110"
              >
                <i className={social.icon_class} />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
