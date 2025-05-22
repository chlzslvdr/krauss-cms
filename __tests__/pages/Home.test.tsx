import { render, screen } from "@testing-library/react";
import Home from "@pages/index";
import Header from "@components/Layout/Header";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@contents/home.md", () => ({
  attributes: {
    name: "Tabitha Krauss",
    subtitle: "Frontend Developer",
    navigations: [
      {
        link: "/",
        page: "Home",
        is_show: false,
      },
      {
        link: "/about",
        page: "About",
        is_show: true,
      },
      {
        link: "/resume",
        page: "Resume",
        is_show: true,
      },
      {
        link: "/portfolio",
        page: "Portfolio",
        is_show: true,
      },
      {
        link: "/blogs",
        page: "Blogs",
        is_show: true,
      },
      {
        link: "/contact",
        page: "Contact",
        is_show: true,
      },
    ],
    social_links: [
      {
        platform: "GitHub",
        url: "https://github.com",
        icon_class: "fi fi-brands-github",
        is_show: true,
      },
      {
        platform: "Facebook",
        url: "https://facebook.com",
        icon_class: "fi fi-brands-facebook",
        is_show: true,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        icon_class: "fi fi-brands-linkedin",
        is_show: true,
      },
    ],
  },
}));

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    pathname: "/",
    push: jest.fn(),
  });
});

describe("Home Page", () => {
  it("renders name and subtitle", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /Tabitha Krauss/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
  });

  it("renders only visible navigations", () => {
    render(<Header />);

    expect(screen.queryByLabelText(/home/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/about/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/resume/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/portfolio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/blogs/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact/i)).toBeInTheDocument();
  });

  it("renders only visible social links", () => {
    render(<Home />);

    expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
  });
});
