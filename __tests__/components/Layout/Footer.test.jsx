import { render, screen } from "@testing-library/react";
import Footer from "@components/Layout/Footer";

describe("Footer component", () => {
  it("renders footer content correctly", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyright =
      screen.getByText(`© ${currentYear} Sample. All rights reserved.`);

    expect(
      screen.getByRole("contentinfo")
    ).toBeInTheDocument();

    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveTextContent(`© ${currentYear} Sample. All rights reserved.`);
  });
});
