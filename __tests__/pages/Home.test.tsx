import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

jest.mock("@contents/home.md", () => ({
  attributes: {
    name: "Maysilee Donner",
    subtitle: "UI Engineer",
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

describe("Home Page", () => {
  it("renders name and subtitle", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /Maysilee Donner/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/UI Engineer/i)).toBeInTheDocument();
  });

  it("renders only visible social links", () => {
    render(<Home />);

    expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
  });
});
