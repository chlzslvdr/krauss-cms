import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { attributes as aboutAttributes } from "@contents/about.md";
import { attributes as testimonialsAttributes } from "@contents/testimonials.md";
import { AboutAttributes } from "@commons/interfaces/about";
import { TestimonialAttributes } from "@commons/interfaces/testimonials";
import SEO from "@components/SEO/index";

const ICONIFY = "iconify";

const About = () => {
  const { summary, technology_stacks, certificates } =
    aboutAttributes as AboutAttributes;
  const { testimonials } = testimonialsAttributes as TestimonialAttributes;

  const filteredTechStackItems = filter(technology_stacks, { is_show: true });
  const filteredCertificateItems = filter(certificates, { is_show: true });
  const filteredTestimonialsItems = filter(testimonials, { is_show: true });

  const isCertificatesNotEmpty = !isEmpty(filteredCertificateItems);
  const isTestimonialsNotEmpty = !isEmpty(filteredTestimonialsItems);

  return (
    <>
      <SEO title="About" />

      <section className="max-w-5xl mx-auto p-8 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h1 className="text-3xl font-bold text-green-primary">
            {summary.job_title}
          </h1>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            {summary.about}
          </p>
          <div className="mt-6 space-y-2">
            <p className="text-gray-800">📧 {summary.email}</p>
            <p className="text-gray-800">📞 {summary.phone}</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto p-8">
        <h2 className="text-3xl font-semibold text-center text-green-primary">
          Technology Stacks
        </h2>
        <ul className="flex flex-wrap justify-center gap-4 mt-6">
          {filteredTechStackItems.map((stack) => (
            <li
              key={stack.tech}
              className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              {stack.icon_class === ICONIFY && stack.data_icon ? (
                <Icon icon={stack.data_icon} className="text-3xl" />
              ) : (
                <i className={`${stack.icon_class} text-3xl`} />
              )}
              <span className="text-lg font-medium text-gray-800">
                {stack.tech}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {isCertificatesNotEmpty && (
        <section className="max-w-5xl mx-auto p-8">
          <h2 className="text-3xl font-semibold text-center text-green-primary">
            Certificates
          </h2>
          <ul className="mt-6 space-y-4">
            {filteredCertificateItems.map((cert) => (
              <li
                key={cert.course}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md transition-transform transform hover:scale-105"
              >
                {cert.icon_class === ICONIFY && cert.data_icon ? (
                  <Icon icon={cert.data_icon} className="text-4xl" />
                ) : (
                  <i className={`${cert.icon_class} text-4xl`} />
                )}
                <Link href={cert.url} legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-secondary text-lg font-medium transition"
                  >
                    {cert.course}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {isTestimonialsNotEmpty && (
        <section className="max-w-6xl mx-auto p-8 mt-12">
          <h2 className="text-4xl font-bold text-center text-green-primary mb-8">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {filteredTestimonialsItems.map((ref) => (
              <div
                key={ref.name}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300"
              >
                <p className="text-gray-700 italic text-center">
                  "{ref.testimonial}"
                </p>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-light-dark">
                    {ref.name}
                  </h3>
                  {ref.title && (
                    <p className="text-sm text-gray-600">{ref.title}</p>
                  )}
                  {ref.company && (
                    <p className="text-sm text-gray-500">{ref.company}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default About;
