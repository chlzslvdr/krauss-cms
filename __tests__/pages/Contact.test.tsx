import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Contact from "@pages/contact/index";

beforeEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe("Contact Page", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders all form fields correctly", () => {
    render(<Contact />);

    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Message/i })
    ).toBeInTheDocument();
  });

  test("disables button and shows 'Sending...' during submission", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({ ok: true })
    );

    render(<Contact />);

    const form = screen.getByTestId("contact-form");
    const submitButton = screen.getByRole("button", { name: /Send Message/i });

    fireEvent.submit(form);

    // Button should be disabled immediately after submit
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/Sending.../i);

    // Wait for success message
    await waitFor(() => {
      expect(
        screen.getByText(/Thank you! Your message has been sent./i)
      ).toBeInTheDocument();
    });
  });

  test("shows success message on successful submission", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<Contact />);

    fireEvent.submit(screen.getByTestId("contact-form"));

    await waitFor(() => {
      expect(
        screen.getByText(/Thank you! Your message has been sent./i)
      ).toBeInTheDocument();
    });
  });

  test("shows error message on failed submission", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    render(<Contact />);

    fireEvent.submit(screen.getByTestId("contact-form"));

    await waitFor(() => {
      expect(
        screen.getByText(/Oops! Something went wrong. Please try again./i)
      ).toBeInTheDocument();
    });
  });

  test("shows error message on fetch rejection", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<Contact />);

    fireEvent.submit(screen.getByTestId("contact-form"));

    await waitFor(() => {
      expect(
        screen.getByText(/Oops! Something went wrong. Please try again./i)
      ).toBeInTheDocument();
    });
  });

  test("resets status to IDLE after 5 seconds", async () => {
    jest.useFakeTimers();
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<Contact />);
    const form = screen.getByTestId("contact-form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByText(/Thank you! Your message has been sent./i)
      ).toBeInTheDocument();
    });

    // Advance timers wrapped in act
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Wait for the success message to disappear (status resets to IDLE)
    await waitFor(() => {
      expect(
        screen.queryByText(/Thank you! Your message has been sent./i)
      ).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
