import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How do I apply for a job?",
        answer: "Create an account, upload your CV, and click the Apply button on any job listing."
    },
    {
        question: "Is creating an account free?",
        answer: "Yes, creating a Jobseeker account on Rojgar Bank is completely free."
    },
    {
        question: "How can employers post jobs?",
        answer: "Employers can register an employer account and post job vacancies from their dashboard."
    },
    {
        question: "Can I update my CV after uploading it?",
        answer: "Yes, you can update or replace your CV anytime from your profile."
    }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gradient-to-b from-cyan-50 to-white py-20 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="text-xs font-semibold tracking-widest text-cyan-900 uppercase">Got Questions?</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                        Frequently Asked <span className="text-cyan-600">Questions</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-3">Everything you need to know about Rojgar Bank</p>
                </div>

                {/* FAQ Grid */}
                <div className="grid lg:grid-cols-2 gap-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden
                                    ${isOpen
                                        ? 'border-cyan-400 shadow-md shadow-cyan-100 bg-white'
                                        : 'border-gray-100 shadow-sm bg-white hover:border-cyan-200 hover:shadow-md'
                                    }`}
                            >
                                {/* Question button */}
                                <button
                                    onClick={() => handleClick(index)}
                                    className="w-full flex justify-between items-center p-5 text-left gap-4"
                                >
                                    {/* Number badge + question */}
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors
                                            ${isOpen ? 'bg-cyan-500 text-white' : 'bg-cyan-50 text-cyan-500'}`}>
                                            {index + 1}
                                        </span>
                                        <span className={`text-sm font-semibold transition-colors ${isOpen ? 'text-cyan-600' : 'text-gray-700'}`}>
                                            {faq.question}
                                        </span>
                                    </div>

                                    {/* Chevron icon — rotates when open */}
                                    <ChevronDown
                                        className={`w-4 h-4 shrink-0 transition-transform duration-300 text-cyan-500
                                            ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Answer — slides in */}
                                <div className={`transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                    <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Faq;