import React, { useState, useEffect } from "react";
import SEO from "@components/SEO/index";

const Contact = () => {
  const [status, setStatus] = useState<
    "IDLE" | "SUCCESS" | "ERROR" | "LOADING"
  >("IDLE");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: new URLSearchParams(formData as any).toString(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        if (response.ok) {
          setStatus("SUCCESS");
          form.reset();
        } else {
          setStatus("ERROR");
        }
      })
      .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    if (status !== "IDLE") {
      const timer = setTimeout(() => setStatus("IDLE"), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <SEO title="Contact" />

      <section className="max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Contact Me
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Feel free to reach out! I'll get back to you as soon as possible.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="mt-6 bg-white p-6 rounded-xl shadow-lg space-y-5"
        >
          <input type="hidden" name="form-name" value="contact" />

          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-secondary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-secondary focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              name="message"
              required
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-secondary focus:outline-none transition h-32 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full bg-green-primary text-white py-3 rounded-lg font-semibold transition cursor-pointer ${
              status === "LOADING"
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-green-secondary"
            }`}
            disabled={status === "LOADING"}
          >
            {status === "LOADING" ? "Sending..." : "Send Message"}
          </button>
        </form>

        <form name="contact" method="POST" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
        </form>

        {status === "SUCCESS" && (
          <p className="text-black mt-4 text-center animate-fade-in-out">
            ✅ Thank you! Your message has been sent.
          </p>
        )}
        {status === "ERROR" && (
          <p className="text-black mt-4 text-center animate-fade-in-out">
            ❌ Oops! Something went wrong. Please try again.
          </p>
        )}
      </section>
    </>
  );
};

export default Contact;
