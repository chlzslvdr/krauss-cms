import React, { useEffect, useState } from "react";
import filter from "lodash/filter";
import { attributes } from "@contents/resume.md";
import { ResumeAttributes } from "@commons/interfaces/resume";
import { convertMarkdownToHtml } from "@commons/methods/convertMarkdownToHtml";
import SEO from "@components/SEO/index";

const PRESENT = "Present";

const Resume = () => {
  const { personal_info, educations, professional_experiences } =
    attributes as ResumeAttributes;

  const filteredEducationItems = filter(educations, { is_show: true });
  const filteredProfessionalExperienceItems = filter(professional_experiences, {
    is_show: true,
  });

  const [processedDescriptions, setProcessedDescriptions] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const processDescriptions = async () => {
      const descriptions: { [key: string]: string } = {};

      for (const educ of filteredEducationItems) {
        if (educ.description) {
          descriptions[educ.school] = await convertMarkdownToHtml(
            educ.description
          );
        }
      }

      for (const exp of filteredProfessionalExperienceItems) {
        if (exp.description) {
          descriptions[exp.company] = await convertMarkdownToHtml(
            exp.description
          );
        }
      }

      setProcessedDescriptions(descriptions);
    };

    processDescriptions();
  }, [filteredEducationItems, filteredProfessionalExperienceItems]);

  return (
    <>
      <SEO title="Resume" />

      <section className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md text-center">
          <h1 className="text-3xl font-bold">{personal_info.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{personal_info.summary}</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-700">📍 {personal_info.address}</p>
            <p className="text-gray-700">📞 {personal_info.phone}</p>
            <p className="text-gray-700">
              📧{" "}
              <a
                href={`mailto:${personal_info.email}`}
                className="underline text-blue-600 hover:text-blue-800"
              >
                {personal_info.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Education
          </h2>
          <ul className="mt-4 space-y-6">
            {filteredEducationItems.map((educ, index) => (
              <li
                key={index}
                className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{educ.school}</h3>
                <p className="text-gray-700 font-semibold">{educ.degree}</p>
                <p className="text-gray-500">
                  {educ.year_started} - {educ.year_ended || PRESENT}
                </p>

                {educ.description && (
                  <div
                    className="text-gray-600 prose mt-2"
                    dangerouslySetInnerHTML={{
                      __html: processedDescriptions[educ.school] || "",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Professional Experience
          </h2>
          <ul className="mt-4 space-y-6">
            {filteredProfessionalExperienceItems.map((exp, index) => (
              <li
                key={index}
                className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{exp.company}</h3>
                <p className="text-gray-700 font-semibold">{exp.position}</p>
                <p className="text-gray-500">
                  {exp.start_date} - {exp.end_date || PRESENT}
                </p>

                {exp.description && (
                  <div
                    className="text-gray-600 prose mt-2"
                    dangerouslySetInnerHTML={{
                      __html: processedDescriptions[exp.company] || "",
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Resume;
