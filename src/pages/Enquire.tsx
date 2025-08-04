import React, { useState } from 'react';

const Enquire = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-screen">
      <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-xl px-6 py-8 sm:px-10 sm:py-12 transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-center mb-8 tracking-tight">
          Enquire About This Property
        </h2>

        {submitted ? (
          <div className="text-center text-green-300 text-lg font-semibold mt-12">
            🎉 Thank you! We’ll get back to you very soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white font-medium block mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 backdrop-blur-md border border-white/20 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 backdrop-blur-md border border-white/20 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="text-white font-medium block mb-2">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message here..."
                className="w-full rounded-lg px-4 py-3 bg-white/20 text-white placeholder-white/60 backdrop-blur-md border border-white/20 shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 focus:ring-4 focus:ring-indigo-400/50"
            >
              ✉️ Send Enquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Enquire;
