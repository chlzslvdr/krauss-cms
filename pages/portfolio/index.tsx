import React from "react";
import Link from "next/link";
import filter from "lodash/filter";
import { attributes } from "@contents/portfolio.md";
import { PortfolioAttributes } from "@commons/interfaces/portfolio";
import SEO from "@components/SEO/index";
import { getImageSrc } from "@commons/methods/getImageSrc";

const Portfolio = () => {
  const { projects } = attributes as PortfolioAttributes;

  const filteredProjectItems = filter(projects, { is_show: true });

  return (
    <>
      <SEO title="Portfolio" />

      <section className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-primary">
          Portfolio
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjectItems.map((proj) => (
            <Link key={proj.project_name} href={proj.url} legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <div className="relative w-full h-48">
                  <img
                    src={getImageSrc(proj.image)}
                    alt={proj.project_name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-light-dark">
                    {proj.project_name}
                  </h2>
                  <p className="text-gray-600 mt-2">{proj.description}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
