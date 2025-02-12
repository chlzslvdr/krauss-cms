interface Project {
  project_name: string;
  description: string;
  url: string;
  image: string;
  is_show: boolean;
}

export interface PortfolioAttributes {
  projects: Project[];
}
