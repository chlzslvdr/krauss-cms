import React, { Component } from "react";
import filter from "lodash/filter";
import { attributes } from "@content/portfolio.md";
import { PortfolioAttributes } from "@commons/interfaces/portfolio";
import SEO from "@components/SEO/index";

const Portfolio = () => {
  const { projects } = attributes as PortfolioAttributes;

  const filteredProjectItems = filter(projects, {
    is_show: true,
  });

  return (
    <>
      <SEO title="Portfolio" />
      <div>
        <h2>Portfolio:</h2>
        <ul>
          {filteredProjectItems.map((proj, index) => (
            <div key={index}>
              <li>{proj.project_name}</li>
              <li>{proj.description}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Portfolio;
