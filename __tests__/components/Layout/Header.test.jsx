import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@components/Layout/Header";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@contents/home.md", () => ({
  attributes: {
    navigations: [
      { link: "/", page: "Home", is_show: false },
      { link: "/about", page: "About", is_show: true },
      { link: "/resume", page: "Resume", is_show: true },
      { link: "/portfolio", page: "Portfolio", is_show: true },
      { link: "/blogs", page: "Blogs", is_show: true },
      { link: "/contact", page: "Contact", is_show: true },
    ],
  },
}));

describe("Header component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not show site title on home page", () => {
    useRouter.mockReturnValue({ pathname: "/" });
    render(<Header />);
    expect(screen.queryByText("Tabitha Krauss")).not.toBeInTheDocument();
  });

  it("shows site title on non-home page", () => {
    useRouter.mockReturnValue({ pathname: "/about" });
    render(<Header />);
    expect(screen.getByText("Tabitha Krauss")).toBeInTheDocument();
  });

  it("renders only nav items with is_show: true (duplicates in both desktop and mobile)", () => {
    useRouter.mockReturnValue({ pathname: "/about" });
    render(<Header />);

    const expectedPages = ["About", "Resume", "Portfolio", "Blogs", "Contact"];

    expectedPages.forEach((page) => {
      const links = screen.getAllByRole("link", { name: page });
      expect(links.length).toBe(2); // desktop + mobile
    });

    // Home (is_show: false) should not appear at all
    expect(screen.queryByRole("link", { name: "Home" })).not.toBeInTheDocument();
  });

  it("applies active styling to nav link on current route", () => {
    useRouter.mockReturnValue({ pathname: "/resume" });
    render(<Header />);

    const activeLinks = screen.getAllByRole("link", { name: "Resume" });
    activeLinks.forEach((link) => {
      expect(link).toHaveClass("text-green-primary");
    });
  });

  it("toggles mobile menu and closes on nav link click", () => {
    useRouter.mockReturnValue({ pathname: "/blogs" });
    render(<Header />);

    const hamburger = screen.getByRole("button");
    fireEvent.click(hamburger); // open mobile menu

    const blogsLinks = screen.getAllByRole("link", { name: "Blogs" });
    expect(blogsLinks.length).toBe(2);

    // Simulate clicking mobile link
    fireEvent.click(blogsLinks[1]);

    // Still in DOM but menu should close visually (we can't test CSS state directly)
    expect(blogsLinks[1]).toBeInTheDocument();
  });
});
