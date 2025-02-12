interface PersonalInfo {
  name: string;
  summary: string;
  address: string;
  phone: string;
}

interface Education {
  school: string;
  degree: string;
  description?: string;
  year_started: number;
  year_ended: number;
  is_show: boolean;
}

interface Experience {
  company: string;
  position: string;
  description?: string;
  start_date: string;
  end_date: string;
  is_show: boolean;
}

export interface ResumeAttributes {
  personal_info: PersonalInfo;
  educations: Education[];
  professional_experiences: Experience[];
}
