import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const stats = [
    { value: "10K+", label: "Candidates" },
    { value: "100+", label: "Jobs Daily" },
    { value: "200+", label: "Companies" },
    { value: "5+", label: "Years" },
    { value: "500+", label: "Daily Visits" },
];

const Ctabanner = () => {
    return (
        <section className="px-4 md:px-8 py-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-300 px-6 py-14 md:px-12 md:py-16 text-white shadow-2xl">

                {/* Background Decorations */}
                <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl"></div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center">

                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                        Find Your Dream Job in Nepal
                        <span className="block text-cyan-100">
                            with RogjarBank
                        </span>
                    </h2>

                    <p className="mt-6 text-white/90 text-base md:text-lg leading-8 max-w-3xl mx-auto">
                        Create your free profile, upload your resume, and apply to
                        hundreds of verified jobs across Nepal. Whether you're a fresher
                        or an experienced professional, RogjarBank helps you connect
                        with top employers.
                    </p>

                    {/* CTA */}
                    <Button
                        className="mt-8 rounded-full bg-white px-8 py-6 text-cyan-600 font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105 hover:bg-cyan-50"
                    >
                        Search Jobs
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    {/* Divider */}
                    <div className="my-12 border-t border-white/20"></div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">

                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 transition duration-300 hover:bg-white/20 hover:-translate-y-1"
                            >
                                <h3 className="text-3xl font-bold">
                                    {item.value}
                                </h3>

                                <p className="mt-2 text-sm uppercase tracking-widest text-white/80">
                                    {item.label}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ctabanner;