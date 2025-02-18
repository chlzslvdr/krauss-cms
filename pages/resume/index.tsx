import React, { useEffect, useState } from "react";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { attributes } from "@contents/resume.md";
import { ResumeAttributes } from "@commons/interfaces/resume";
import { convertMarkdownToHtml } from "@commons/methods/convertMarkdownToHtml";
import SEO from "@components/SEO/index";
import { getFileSrc } from "@commons/methods/getFileSrc";

const PRESENT = "Present";

const DEFAULT_RESUME = "https://chlzslvdr.sirv.com/krauss/resume.pdf";

const Resume = () => {
  const { personal_info, educations, professional_experiences, cv } =
    attributes as ResumeAttributes;

  const filteredEducationItems = filter(educations, { is_show: true });
  const filteredProfessionalExperienceItems = filter(professional_experiences, {
    is_show: true,
  });
  const isCVNotEmpty = !isEmpty(cv);

  const [processedDescriptions, setProcessedDescriptions] = useState<
    Map<string, string>
  >(new Map());

  useEffect(() => {
    const processDescriptions = async () => {
      const descriptions = new Map<string, string>();

      await Promise.all(
        filteredProfessionalExperienceItems.map(async (exp) => {
          if (exp.description) {
            const html = await convertMarkdownToHtml(exp.description);
            descriptions.set(exp.company, html);
          }
        })
      );

      setProcessedDescriptions(descriptions);
    };

    processDescriptions();
  }, [filteredProfessionalExperienceItems]);

  const resumeCV = getFileSrc(cv) ?? DEFAULT_RESUME;

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

          {isCVNotEmpty && (
            <div className="mt-6">
              <a
                download
                href={resumeCV}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Download Resume
              </a>
            </div>
          )}
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
                  <p className="text-gray-600 mt-2">{educ.description}</p>
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

                {exp.description && processedDescriptions.has(exp.company) && (
                  <div className="text-gray-700 text-sm space-y-3 mt-2">
                    <div
                      className="text-gray-600 mt-2 [&>p]:mb-2 [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                      dangerouslySetInnerHTML={{
                        __html: processedDescriptions.get(exp.company) || "",
                      }}
                    />
                  </div>
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
