interface NavigationItem {
  page: string;
  link: string;
  is_show: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
  icon_class: string;
  is_show: boolean;
}

export interface HomeAttributes {
  name: string;
  subtitle: string;
  navigations: NavigationItem[];
  social_links: SocialLink[];
}
