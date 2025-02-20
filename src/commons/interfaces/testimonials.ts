interface Testimonial {
  name: string;
  title?: string;
  company?: string;
  testimonial: string;
  is_show: boolean;
}
export interface TestimonialAttributes {
  testimonials: Testimonial[];
}
