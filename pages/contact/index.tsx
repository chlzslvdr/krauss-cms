import React, { useState, useEffect } from "react";
import SEO from "@components/SEO/index";

const Contact = () => {
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
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
        <h1 className="text-4xl font-bold text-center text-gray-900">Contact Me</h1>
        <p className="text-gray-600 text-center mt-2">
          Feel free to reach out! I'll get back to you as soon as possible.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="mt-6 bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              name="message"
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none h-24"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>

        <form name="contact" method="POST" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
        </form>

        {status === "SUCCESS" && (
          <p className="text-green-600 mt-4 text-center animate-fade">
            ✅ Thank you! Your message has been sent.
          </p>
        )}
        {status === "ERROR" && (
          <p className="text-red-600 mt-4 text-center animate-fade">
            ❌ Oops! Something went wrong. Please try again.
          </p>
        )}
      </section>
    </>
  );
};

export default Contact;
