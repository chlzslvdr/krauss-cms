import React, { Component } from "react";
import { Icon } from "@iconify/react";
import filter from "lodash/filter";
import { attributes } from "@content/about.md";
import { AboutAttributes } from "@commons/interfaces/about";
import SEO from "@components/SEO/index";

const ICONIFY = "iconify";

const About = () => {
  const { summary, technology_stacks, certificates } =
    attributes as AboutAttributes;

  const filteredTechStackItems = filter(technology_stacks, { is_show: true });
  const filteredCertificateItems = filter(certificates, { is_show: true });

  return (
    <>
      <SEO title="About" />
      <div>
        <h1>{summary.email}</h1>
        <p>{summary.job_title}</p>
        <p>{summary.phone}</p>
        <p>{summary.about}</p>

        <h2>Technology Stacks:</h2>
        <ul>
          {filteredTechStackItems.map((stack, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>{stack.tech}</span>
              {stack.icon_class === ICONIFY && stack.data_icon ? (
                <Icon icon={stack.data_icon} className="text-2xl" />
              ) : (
                <i className={stack.icon_class} />
              )}
            </li>
          ))}
        </ul>

        <h2>Certificates:</h2>
        <ul>
          {filteredCertificateItems.map((cert, index) => (
            <li key={index}>{cert.course}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default About;
