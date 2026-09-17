import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What services do you provide?",
    a: "We provide comprehensive recruitment, HR outsourcing, and workforce management services.",
  },
  {
    q: "Can you help post and manage job vacancies?",
    a: "Yes, our platform allows you to easily post vacancies and track applicants through our centralized dashboard.",
  },
  {
    q: "Do you provide recruitment services?",
    a: "Yes, we handle everything from sourcing and screening to candidate matching.",
  },
  {
    q: "Do you provide HR outsourcing?",
    a: "Yes, we offer flexible HR outsourcing including payroll and staff management.",
  },
  {
    q: "Can you help with employee training?",
    a: "We provide HR consulting and training services to develop your workforce.",
  },
  {
    q: "Are your services suitable for startups and small businesses?",
    a: "Absolutely, we have customized solutions designed to fit the budgets and needs of small businesses.",
  },
  {
    q: "How quickly can you help us hire employees?",
    a: "Our fast hiring process and large candidate pool ensure minimal time-to-hire, often within a few days depending on the role.",
  },
  {
    q: "Why should companies choose us?",
    a: "We combine an extensive candidate network with industry expertise to deliver high-quality, tailored recruitment services.",
  },
  {
    q: "How much do your services cost?",
    a: "Costs vary depending on the service level required. Contact us for a detailed proposal.",
  },
  {
    q: "How do I get started?",
    a: "You can start by submitting an enquiry through our form below, or by registering as an employer.",
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition hover:text-blue-600"
      >
        <span className="text-[17px] font-semibold text-slate-800">
          {item.q}
        </span>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
          }`}
        >
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-base leading-relaxed text-slate-600">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // First open by default, as is common

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
