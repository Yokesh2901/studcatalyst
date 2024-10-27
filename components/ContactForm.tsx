"use client"
import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_hbp0ixr', // Replace with your service ID
      'template_eybvgrd', // Replace with your template ID
      {
        from_name: form.name,
        to_name: 'Yokesh',
        from_email: form.email,
        to_email: 'yokeshsrinivasan29@gmail.com', // Replace with your email
        message: form.message,
      },
      'ZdjDiDkHfNVpjMF9s' // Replace with your public key
    )
    .then(() => {
      setLoading(false);
      alert('Thank you! I will get back to you soon.');

      setForm({
        name: '',
        email: '',
        message: '',
      });
    }, (error: any) => {
      setLoading(false);
      console.error(error);
      alert('Something went wrong. Please try again.');
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-800 p-5 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-white">Contact Me</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Your name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm text-gray-200 placeholder-gray-400 bg-white border-0 rounded shadow"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm text-gray-200 placeholder-gray-400 bg-white border-0 rounded shadow"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          rows="2" //keep this as a number
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message"
          className="w-full px-3 py-2 text-sm text-black-200 placeholder-gray-400 bg-white border-0 rounded shadow"
          required
        />
      </div>
      <button 
        type="submit" 
        className="px-6 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 hover:bg-blue-400"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send a message'}
      </button>
    </form>
  );
};

export default ContactForm;
