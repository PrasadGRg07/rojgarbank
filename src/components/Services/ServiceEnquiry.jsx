import React, { useState } from "react";
import imgEnquiry from "../../assets/enquiry-illustration.png";

export default function ServiceEnquiry() {
  const [formData, setFormData] = useState({
    companySize: "",
    service: "",
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Enquiry submitted! We will contact you soon.");
  };

  return (
    <section className="bg-[#F4F8FB] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: Illustration */}
          <div className="flex justify-center">
            <div className="flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-3xl p-8">
              <img src={imgEnquiry} alt="Enquiry" className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-10">
            <h2 className="mb-8 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
              Ready to Simplify Your HR, Hiring and Workforce Management?
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Company Size */}
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Company Size
                  </option>
                  <option value="0-20">0–20</option>
                  <option value="20-50">20–50</option>
                  <option value="50-100">50–100</option>
                  <option value="100-250">100–250</option>
                  <option value="250+">250+</option>
                </select>

                {/* Choose Service */}
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Choose Service
                  </option>
                  <option value="Hiring and Management">
                    Hiring and Management
                  </option>
                  <option value="Human Resource Consulting">
                    Human Resource Consulting
                  </option>
                  <option value="Recruitment">Recruitment</option>
                  <option value="Outsourcing">Outsourcing</option>
                </select>
              </div>

              {/* Company Name */}
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-[#2563EB] py-4 text-base font-bold text-white transition hover:bg-blue-700"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
