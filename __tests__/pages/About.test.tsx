import { render, screen } from "@testing-library/react";
import About from "@pages/about/index";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@iconify/react", () => ({
  Icon: (props: any) => <i data-testid="icon" {...props} />,
}));

jest.mock("@contents/about.md", () => ({
  attributes: {
    summary: {
      job_title: "UI Engineer",
      about: "Passionate about building web apps.",
      email: "test@example.com",
      phone: "123-456-7890",
    },
    technology_stacks: [
      {
        tech: "React",
        icon_class: "icon-react",
        is_show: true,
      },
      {
        tech: "Vue",
        icon_class: "icon-vue",
        is_show: false,
      },
    ],
    certificates: [
      {
        course: "React Advanced",
        url: "https://example.com/react",
        icon_class: "iconify",
        data_icon: "logos:react",
        is_show: true,
      },
      {
        course: "Basic HTML",
        url: "#",
        icon_class: "iconify",
        data_icon: "logos:hidden",
        is_show: false,
      },
    ],
  },
}));

jest.mock("@contents/testimonials.md", () => ({
  attributes: {
    testimonials: [
      {
        name: "Wyatt Callow",
        testimonial: "Great to work with!",
        title: "Manager",
        company: "TechCorp",
        is_show: true,
      },
      {
        name: "Lou Lou",
        testimonial: "Hidden",
        is_show: false,
      },
    ],
  },
}));

describe("About Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/about" });
  });

  it("renders summary info", () => {
    render(<About />);
    expect(screen.getByText("UI Engineer")).toBeInTheDocument();
    expect(
      screen.getByText("Passionate about building web apps.")
    ).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/)).toBeInTheDocument();
  });

  it("shows only visible technology stacks", () => {
    render(<About />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText("Vue")).not.toBeInTheDocument();
  });

  it("renders visible certificates", () => {
    render(<About />);
    expect(screen.getByText("Certificates")).toBeInTheDocument();
    expect(screen.getByText("React Advanced")).toBeInTheDocument();
    expect(screen.queryByText("Basic HTML")).not.toBeInTheDocument();
  });

  it("renders visible testimonials", () => {
    render(<About />);
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
    expect(screen.getByText(/Great to work with!/)).toBeInTheDocument();
    expect(screen.getByText("Wyatt Callow")).toBeInTheDocument();
    expect(screen.getByText("Manager")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();

    expect(screen.queryByText("Lou Lou")).not.toBeInTheDocument();
  });
});
