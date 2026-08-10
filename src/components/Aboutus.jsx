import React, { useState } from 'react'
import Navbar from './Navbar'
import ceo from '../assets/ceo.png'
import cfo from '../assets/cfo.png'
import manager from '../assets/manager.png'
import hr from '../assets/hr.png'
import Footer from './Footer'
import { Plus } from 'lucide-react'
import fd from '../assets/fd.png'
import mission from '../assets/mission.png'
import vision from '../assets/vision.png'
import opp from '../assets/opp.png'
import wr from '../assets/wr.png'

const leadership = [
    {
        name: 'CEO',
        role: 'Chief Executive Officer',
        image: ceo,
        message:
            "From my professional experience, I have realized that people are the foundation of every organization's success. At Rojgar Bank Private Limited, we are committed to bridging the gap between talent and opportunities across Nepal. Our mission has always been to build a reliable, ethical, and professional platform where job seekers can discover meaningful career opportunities and employers can find the right individuals to strengthen and grow their organizations. As we continue to expand and diversify our services.",
    },
    {
        name: 'Manager',
        role: 'Recruitment Manager',
        image: manager,
        message:
            "At Rojgar Bank Private Limited, we believe that every successful placement creates opportunities for both individuals and organizations to grow. Our commitment is to provide reliable, ethical, and professional recruitment services by connecting talented job seekers with the right employers across Nepal. We strive to understand the unique needs of every client and candidate, ensuring the best possible match through a transparent and efficient recruitment process. As we continue to expand our services..",
    }
]

const pillars = [
    {
        title: 'Our Mission',
        image: mission,
        description:
            "Our mission at Rojgar Bank Private Limited is simple yet purposeful: to provide professional, ethical, and reliable human resource and recruitment services that connect talented individuals with the right employment opportunities. We are committed to making the recruitment process more transparent, efficient, and people-centered while helping employers find the right talent to achieve their organizational goals. Through our dedicated services, we strive to empower job seekers, strengthen businesses, and contribute to the development of a skilled and productive workforce across Nepal..",
    },
    {
        title: 'Our Vision',
        image: vision,
        description:
            "Our vision is to become Nepal's leading HR and recruitment solution provider by upholding the highest standards of integrity, professionalism, innovation, and excellence. Through continuous improvement, advanced recruitment practices, and strong partnerships with employers and job seekers, we aspire to create a more productive, inclusive, and opportunity-driven employment ecosystem while contributing to the sustainable growth of Nepal's workforce and economy..",
    },
    {
        title: 'Opportunities at Rogjarbank',
        image: opp,
        description:
            "At Rojgar Bank Private Limited, we believe that talented people are the key to success. We are always looking for passionate, dedicated, and skilled individuals who are eager to grow their careers while making a meaningful impact. Join our team and become part of an organization that values innovation, integrity, teamwork, and continuous professional development. Together, let's build a brighter future for Nepal's workforce..",
    },
    {
        title: 'Why Choose Rogjarbank?',
        image: wr,
        description:
            "At Rojgar Bank Private Limited, we do more than just fill vacancies—we build careers and strengthen organizations. Through our personalized recruitment approach, industry expertise, and extensive network of talented professionals, we connect the right people with the right opportunities. We believe recruitment is not simply about matching candidates with jobs, but about creating meaningful careers, empowering businesses, and contributing to the long-term growth of Nepal's workforce..",
    }
]

const team = [
    {
        name: "Dinesh Bhatt",
        role: "Business Development Manager ",
        bio: "Business Development Manager with experience in identifying new business opportunities, building and maintaining strong client relationships, developing strategic partnerships, and driving revenue growth. ..",
        image: hr,
    },
    {
        name: "Pappu kumar Sah",
        role: " Finance and Accounts Officer",
        bio: "Finance and Accounts Professional with experience in managing financial records, budgeting, payroll processing, taxation, bank reconciliation, invoicing, and financial reporting. ",
        image: fd,
    },
    {
        name: "Sandhya Thagunna",
        role: "Senior Recruitment Officer",
        bio: "Experienced Senior Recruitment Officer with expertise in end-to-end recruitment, talent acquisition, candidate sourcing, interviewing, employee onboarding, and workforce planning. .",
        image: cfo,
    },
]

function TeamCard({ member }) {
    const [imgError, setImgError] = useState(false)

    return (
        <div className="flex flex-col items-center rounded-xl border-2 border-teal-400 bg-white px-8 py-10 text-center shadow-sm transition-shadow hover:shadow-md">
            {member.image && !imgError ? (
                <img
                    src={member.image}
                    alt={member.name}
                    onError={() => setImgError(true)}
                    className="mb-5 h-24 w-24 rounded-md object-cover"
                />
            ) : (
                <button
                    type="button"
                    aria-label={`Add photo for ${member.name}`}
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 text-white transition-colors hover:bg-teal-600"
                >
                    <Plus className="h-5 w-5" strokeWidth={2.5} />
                </button>
            )}

            <h3 className="text-lg font-bold text-teal-800">
                {member.image ? member.name : `About ${member.name}`}
            </h3>

            {member.image && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-teal-500">
                    {member.role}
                </p>
            )}

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
                {member.bio}
            </p>
        </div>
    )
}

const Aboutus = () => {
    return (
        <div className="bg-[#F8F7F4] min-h-screen">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            {/* Page intro */}
            <div className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                    About Us
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                    Leadership That Puts People First
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed">
                    Meet the team guiding our mission, our values, and the way we work every single day.
                </p>
            </div>


            {/* Leadership messages */}
            <div className="max-w-6xl mx-auto px-6 pb-24 space-y-20">
                {leadership.map((person, index) => (
                    <div
                        key={person.name}
                        className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                            }`}>
                        <div className="relative">
                            <div className="absolute -inset-3 border border-[#C9A227]/40 rounded-2xl -z-10 hidden md:block" />
                            <img
                                src={person.image}
                                alt={`${person.role} portrait`}
                                className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
                            />
                        </div>

                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                                Message from our {person.name}
                            </p>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                {person.role}
                            </h2>
                            <div className="w-12 h-[3px] bg-[#C9A227] mb-6" />
                            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                                {person.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Mission, Vision, Opportunities */}
            <div className="max-w-8xl mx-auto px-6 pb-24 space-y-20">
                {pillars.map((pillar, index) => (
                    <div
                        key={pillar.title}
                        className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                            }`}>
                        <div className="relative">
                            <div className="absolute -inset-3 border border-[#C9A227]/40 rounded-2xl -z-10 hidden md:block" />
                            <img
                                src={pillar.image}
                                alt={`${pillar.title} image`}
                                className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                        <div
                            key={pillar.title}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold  mb-3">
                                {pillar.title}
                            </h3>
                            <div className="w-10 h-[3px] bg-[#2D6A6A] mb-4" />
                            <p className="text-slate-600 leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Our Team */}
            <section className="w-full">
                <div className="max-w-5xl mx-auto px-6 pb-24">
                    <h2 className="mb-12 text-center text-3xl font-bold text-teal-800">
                        Our Team
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((member) => (
                            <TeamCard key={member.name} member={member} />
                        ))}
                    </div>
                </div>
            </section>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Aboutus