import React, { useState } from "react";
import SEO from "@components/SEO/index";

const Contact = () => {
  const [status, setStatus] = useState("");

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
      } else {
        setStatus("ERROR");
      }
    } catch {
      setStatus("ERROR");
    }
  };

  return (
    <>
      <SEO title="Contact" />
      <div>
        <h1>Contact</h1>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" required />
          </label>
          <button type="submit">Send</button>
        </form>

        <form name="contact" method="POST" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
        </form>

        {status === "SUCCESS" && <p>Thank you! Your message has been sent.</p>}
        {status === "ERROR" && (
          <p>Oops! Something went wrong. Please try again.</p>
        )}
      </div>
    </>
  );
};

export default Contact;
