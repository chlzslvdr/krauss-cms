import React, { Component } from "react";
import filter from "lodash/filter";
import { attributes } from "@content/testimonials.md";
import { TestimonialAttributes } from "@commons/interfaces/testimonials";
import SEO from "@components/SEO/index";

const Testimonials = () => {
  const { testimonials } = attributes as TestimonialAttributes;

  const filteredTestimonialsItems = filter(testimonials, {
    is_show: true,
  });

  return (
    <>
      <SEO title="Testimonials" />
      <div>
        <h2>Testimonials:</h2>
        {filteredTestimonialsItems.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            {item.title && <div>{item.title}</div>}
            {item.company && <div>{item.company}</div>}
            <div>{item.testimonial}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testimonials;
