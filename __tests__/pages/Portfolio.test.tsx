import { render, screen } from "@testing-library/react";
import Portfolio from "@pages/portfolio/index";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@commons/methods/getAssetsSrc", () => ({
  getAssetsSrc: (path: string) => `/mocked/${path}`,
}));

jest.mock("@contents/portfolio.md", () => ({
  attributes: {
    projects: [
      {
        project_name: "Visible Project",
        description: "A visible project",
        url: "https://example.com/visible",
        image: "visible.png",
        is_show: true,
      },
      {
        project_name: "Hidden Project",
        description: "Should not be shown",
        url: "https://example.com/hidden",
        image: "hidden.png",
        is_show: false,
      },
    ],
  },
}));

describe("Portfolio Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/portfolio" });
  });

  it("renders the Portfolio title", () => {
    render(<Portfolio />);
    expect(
      screen.getByRole("heading", { name: /Portfolio/i })
    ).toBeInTheDocument();
  });

  it("displays only projects with is_show: true", () => {
    render(<Portfolio />);
    expect(screen.getByText("Visible Project")).toBeInTheDocument();
    expect(screen.getByText("A visible project")).toBeInTheDocument();

    // Ensure hidden project is not rendered
    expect(screen.queryByText("Hidden Project")).not.toBeInTheDocument();
    expect(screen.queryByText("Should not be shown")).not.toBeInTheDocument();
  });

  it("renders project image with correct alt text", () => {
    render(<Portfolio />);
    const img = screen.getByAltText("Visible Project") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/mocked/visible.png");
  });

  it("links to project URLs correctly", () => {
    render(<Portfolio />);
    const link = screen.getByRole("link", { name: /Visible Project/i });
    expect(link).toHaveAttribute("href", "https://example.com/visible");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
