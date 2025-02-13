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
      <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-lg text-gray-600 mt-2">{subtitle}</p>

        <div className="flex gap-4 mt-6">
          {filteredSocialLinks.map((social, index) => (
            <Link key={index} href={social.url} legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="text-2xl text-gray-700 hover:text-black transition"
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
