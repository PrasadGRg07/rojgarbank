import React from 'react'
import { Search, Briefcase, Bell, Star } from "lucide-react";


const features = [
  {
    icon: Search,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Smart Job Search at Your Fingertips",
    description:
      "Filter thousands of jobs by location, industry, salary range, and experience level. Find the role that truly fits you — not just any job, the right one.",
  },
  {
    icon: Briefcase,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    title: "Thousands of Opportunities, One Platform",
    description:
      "Whether you're a fresh graduate or a seasoned professional, RogjarBank connects you to top companies hiring right now across every industry in Nepal.",
  },
  {
    icon: Bell,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    title: "Never Miss Your Dream Job Again",
    description:
      "Get instant alerts on your phone and email the moment a job matching your profile is posted. Be the first to apply and stay ahead of the competition.",
  },
  {
    icon: Star,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    title: "Unlock Jobs You Won't Find Elsewhere",
    description:
      "Access exclusive premium listings from Nepal's top employers — roles that are only advertised on RogjarBank and filled fast. Don't miss your chance.",
  },
];

const FeaturesSection = () => {
    return (
        <section className="bg-gradient-to-b from-sky-50 to-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <h2 className="text-center text-2xl md:text-3xl font-bold text-cyan-600 mb-12">
                    Your Path to Employment in Nepal Starts with{" "}
                    <span className="text-cyan-700">RogjarBank</span>
                </h2>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(({ icon: Icon, iconBg, iconColor, title, description }) => (
                        <div
                            key={title}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mb-5`}>
                                <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-semibold text-gray-800 mb-3 leading-snug">
                                {title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection