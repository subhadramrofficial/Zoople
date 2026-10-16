"use client"; 

import { useState } from "react";

export default function ContactForm() {
  
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();       
    setSubmitted(true);           
    event.target.reset();        
  }

  return (
    <>
      {submitted && (
        <div className="success" role="status">
          ✅ Thank you! Your message has been submitted.
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required />

        <button type="submit" className="btn">Submit</button>
      </form>
    </>
  );
}