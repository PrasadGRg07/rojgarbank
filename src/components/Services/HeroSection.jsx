import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/hero-services.png";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Side */}
          <div className="order-2 lg:order-1">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Complete Hiring, Recruitment &amp; HR Services in Nepal
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              Rojgarbank is Nepal's trusted platform connecting businesses with
              top talent. We provide comprehensive recruitment solutions, HR
              outsourcing, and workforce management tools to help your
              organization scale efficiently.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/employee/register")}
                className="rounded-lg bg-[#2563EB] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                Post a Job
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Request a Callback
              </button>
            </div>
          </div>

          {/* Illustration Side */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="flex w-full max-w-md items-center justify-center overflow-hidden rounded-2xl">
              <img src={heroImg} alt="Hero Services" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
