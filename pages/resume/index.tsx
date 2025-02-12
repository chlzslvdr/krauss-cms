import React, { Component } from "react";
import filter from "lodash/filter";
import { attributes } from "@content/resume.md";
import { ResumeAttributes } from "@commons/interfaces/resume";
import SEO from "@components/SEO/index";

const Resume = () => {
  const { personal_info, educations, professional_experiences } =
    attributes as ResumeAttributes;

  const filteredEducationItems = filter(educations, {
    is_show: true,
  });

  const filteredProfessionalExperienceItems = filter(professional_experiences, {
    is_show: true,
  });

  return (
    <>
      <SEO title="Resume" />
      <div>
        <h1>{personal_info.name}</h1>
        <p>{personal_info.summary}</p>
        <p>{personal_info.address}</p>
        <p>{personal_info.phone}</p>

        <h2>Educations:</h2>
        <ul>
          {filteredEducationItems.map((educ, index) => (
            <div key={index}>
              <li>{educ.school}</li>
              <li>{educ.degree}</li>
              <li>{educ.description}</li>
            </div>
          ))}
        </ul>

        <h2>Professional Experiences:</h2>
        <ul>
          {filteredProfessionalExperienceItems.map((exp, index) => (
            <div key={index}>
              <li>{exp.company}</li>
              <li>{exp.position}</li>
              <li>{exp.description}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Resume;
