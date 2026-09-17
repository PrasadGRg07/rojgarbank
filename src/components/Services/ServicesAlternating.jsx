import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import img1 from "../../assets/vacancy-management.png";
import img2 from "../../assets/outsourcing-services.png";
import img3 from "../../assets/recruitment-tools.png";
import img4 from "../../assets/hr-consulting.png";

const servicesData = [
  {
    title: "Vacancy Announcement & Management Tools",
    description:
      "Our hiring and management tools simplify recruitment and employee tracking, helping businesses post jobs, manage candidates, and monitor workforce efficiently.",
    features: [
      "Easy Job Posting and Tracking",
      "Advanced Candidate Search and Filters",
      "Centralized Employee Management Dashboard",
    ],
    buttonText: "Learn More",
    imageLeft: true,
    img: img1,
  },
  {
    title: "Outsourcing Services",
    description:
      "Flexible outsourcing solutions that help businesses manage staffing and HR operations while focusing on their core business.",
    features: [
      "Payroll Management",
      "Staff Outsourcing",
      "Workforce Support",
    ],
    buttonText: "Learn More",
    imageLeft: false,
    img: img2,
  },
  {
    title: "Recruitment Tools & Services",
    description:
      "Our recruitment services help companies connect with qualified candidates through efficient sourcing, screening, and candidate matching.",
    features: [
      "Large Candidate Pool",
      "Industry-Specific Recruitment",
      "Fast Hiring Process",
    ],
    buttonText: "Learn More",
    imageLeft: true,
    img: img3,
  },
  {
    title: "HR Consulting",
    description:
      "Our HR consulting services help businesses improve policies, employee development, workplace engagement, and workforce management.",
    features: [
      "HR Policy Development",
      "Employee Training",
      "Employee Engagement",
      "Retention Strategies",
    ],
    buttonText: "Learn More",
    imageLeft: false,
    img: img4,
  },
];

export default function ServicesAlternating() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Comprehensive solutions designed to help you hire, manage, and scale
            your workforce effectively.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                !service.imageLeft ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-video w-full overflow-hidden rounded-2xl flex items-center justify-center">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover rounded-2xl shadow-sm" />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 lg:px-8">
                <h3 className="mb-6 text-3xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mb-8 text-lg text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                <ul className="mb-8 space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-base text-slate-700 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  {service.buttonText} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
