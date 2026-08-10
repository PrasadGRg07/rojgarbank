import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = encodeURIComponent(`New message from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        );

        window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <main>
                {/* Header */}
                <section className="border-b border-slate-200 bg-white">
                    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14 text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900 tracking-tight">
                            Talk to Us
                        </h1>
                        <p className=" text-black mt-3 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                            Do you have any questions or feedback? We'd love to hear from you.
                        </p>
                        <p className="text-sm sm:text-base text-cyan-700 font-semibold mt-1">
                            Contact Us at    01-4567890
                        </p>

                    </div>
                </section>

                {/* Content */}
                <section className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
                    <div className="grid md:grid-cols-2 gap-6 items-start">

                        {/* Map card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-2 px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
                                <MapPin className="w-5 h-5 text-cyan-700" />
                                <h2 className="text-base font-semibold text-slate-900">
                                    Our Location
                                </h2>
                            </div>
                            <iframe
                                src="https://maps.google.com/maps?q=YOUR+ADDRESS+HERE&output=embed"
                                width="100%"
                                height="280"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Rojgar Office Location"
                                className="block sm:h-[380px]"
                            ></iframe>
                        </div>

                        {/* Contact form card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
                                <Mail className="w-5 h-5 text-cyan-700" />
                                <h2 className="text-base font-semibold text-slate-900">
                                    Send a Message
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 sm:p-6">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-shadow"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-shadow"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                                        Phone <span className="text-slate-400 font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-shadow"
                                        placeholder="98XXXXXXXX"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-shadow resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 bg-cyan-700 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-cyan-800 active:bg-cyan-900 transition-colors mt-1"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>

                                <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    We typically respond within 1-2 business days.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    )
}

export default Contact