interface Summary {
  email: string;
  job_title: string;
  phone: string;
  about: string;
}

interface TechnologyStack {
  tech: string;
  class: string;
  data_icon?: string;
  icon_class: string;
  is_show: boolean;
}

interface Certificates {
  course: string;
  url: string;
  icon_class: string;
  is_show: boolean;
}

export interface AboutAttributes {
  summary: Summary;
  technology_stacks: TechnologyStack[];
  certificates: Certificates[];
}
