import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import PageLoader from './PageLoader'
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
    title: "Our Mission",
    image: mission,
    description:
      "To bridge the gap between employers and job seekers through professional recruitment, quality training, reliable workforce outsourcing, and strategic HR solutions while maintaining the highest standards of integrity, service excellence, innovation, and customer satisfaction.",
  },
  {
    title: "Our Vision",
    image: vision,
    description:
      "To become Nepal's most trusted, innovative, and preferred human resource solutions provider by connecting people with opportunities and enabling organizations to build a future-ready workforce.",
  },
  {
    title: "Opportunities at Rogjarbank",
    image: opp,
    description:
      "At Rojgar Bank Private Limited, we believe that talented people are the key to success. We are always looking for passionate, dedicated, and skilled individuals who are eager to grow their careers while making a meaningful impact. Join our team and become part of an organization that values innovation, integrity, teamwork, and continuous professional development. Together, let's build a brighter future for Nepal's workforce..",
  },
  {
    title: "Why Choose Rogjarbank?",
    image: wr,
    description:
      "At Rojgar Bank Private Limited, we do more than just fill vacancies—we build careers and strengthen organizations. Through our personalized recruitment approach, industry expertise, and extensive network of talented professionals, we connect the right people with the right opportunities. We believe recruitment is not simply about matching candidates with jobs, but about creating meaningful careers, empowering businesses, and contributing to the long-term growth of Nepal's workforce..",
  },
];

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
        <div className="flex flex-col items-center rounded-xl border-2 border-sky-400 bg-white px-8 py-10 text-center shadow-sm transition-shadow hover:shadow-md">
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
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-600"
                >
                    <Plus className="h-5 w-5" strokeWidth={2.5} />
                </button>
            )}

            <h3 className="text-lg font-bold text-black">
                {member.image ? member.name : `About ${member.name}`}
            </h3>

            {member.image && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-sky-600">
                    {member.role}
                </p>
            )}

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-black">
                {member.bio}
            </p>
        </div>
    )
}

const Aboutus = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F7F4]">
                <Navbar />
                <div className="flex items-center justify-center py-40">
                    <PageLoader message="Please wait..." />
                </div>
            </div>
        )
    }

    return (
      <div className="bg-[#F8F7F4] min-h-screen">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        {/* Page intro */}
        <div className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
          {/* Section Heading */}
          <div className="mb-14 text-center">
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-black md:text-5xl lg:text-6xl">
              Empowering People.
              <span className="block text-sky-600">
                Building Organizations.
              </span>
            </h1>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-sky-400" />

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black md:text-lg">
              Connecting talented people with meaningful opportunities while
              helping organizations build stronger, future-ready teams.
            </p>
          </div>

          {/* Company Introduction */}
          <div className="mx-auto max-w-4xl">
            <div className="space-y-7">
              <p className="text-[16px] leading-[1.9] tracking-[0.005em] text-black md:text-[17px]">
                <strong className="font-bold text-black">
                  ROJGAR BANK Private Limited
                </strong>
                , established in 2073 B.S., is one of Nepal's leading Human
                Resource, Recruitment, Training, and Workforce Outsourcing
                companies, headquartered in Kathmandu. With{" "}
                <span className="text-sky-600 font-semibold">10+ years of
                industry experience</span>, we have been empowering organizations with
                strategic workforce solutions while connecting talented
                professionals with rewarding career opportunities across Nepal.
              </p>

              <p className="text-[16px] leading-[1.9] tracking-[0.005em] text-black md:text-[17px]">
                Over the years, we have earned the trust of businesses across
                diverse industries by delivering reliable, innovative, and
                results-driven HR solutions. Our comprehensive service portfolio
                includes recruitment and executive search, employee outsourcing,
                payroll administration, temporary staffing, corporate training,
                HR consulting, and end-to-end workforce management. Every
                solution is designed to help organizations enhance productivity,
                improve operational efficiency, and achieve sustainable business
                growth.
              </p>

              <p className="text-[16px] leading-[1.9] tracking-[0.005em] text-black md:text-[17px]">
                Backed by a highly experienced HR team, a robust talent network,
                and modern recruitment practices, we provide customized,
                cost-effective, and compliant workforce solutions that create
                long-term value for both employers and job seekers.
              </p>
            </div>

            {/* Small highlight */}
            <div className="mt-12 flex items-center gap-4 border-l-4 border-sky-500 bg-white px-6 py-5 shadow-sm">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-sky-600">
                  Our Commitment
                </p>
                <p className="mt-1 text-sm leading-6 text-black">
                  Integrity, professionalism, innovation, excellence, and
                  customer commitment guide everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* Our Achievements */}
          <div className="max-w-4xl mx-auto px-6 pb-24">
            <h2 className="text-3xl font-bold text-center text-black mb-12">
              Our Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-sky-600">10+</p>
                <p className="text-black mt-2">
                  Years of HR & Recruitment Excellence
                </p>
              </div>
              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-sky-600">50,000+</p>
                <p className="text-black mt-2">
                  Qualified Candidate CV Database
                </p>
              </div>
              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-sky-600">1,000+</p>
                <p className="text-black mt-2">
                  Successful Candidate Placements
                </p>
              </div>
              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-sky-600">300+</p>
                <p className="text-black mt-2">
                  Corporate Clients Across Nepal
                </p>
              </div>
              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-sky-600">20+</p>
                <p className="text-black mt-2">
                  Live Job Opportunities Published Daily
                </p>
              </div>
              <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <p className="text-3xl font-bold text-sky-600">500,000+</p>
                <p className="text-black mt-2">Professional Network</p>
              </div>
            </div>
            <div className="mt-12 max-w-4xl mx-auto space-y-6">
              <p className="text-black text-lg leading-relaxed">
                At <strong className="text-sky-600">ROJGAR BANK</strong>, we believe that people are the
                foundation of every successful organization. We are committed to
                helping businesses build high-performing teams while empowering
                individuals through professional recruitment, career
                development, skill enhancement, and employment opportunities.
              </p>
              <p className="text-black text-lg leading-relaxed">
                Driven by our core values of{" "}
                <span className="text-sky-600 font-semibold">
                  Integrity, Professionalism, Innovation, Excellence, and Customer Commitment
                </span>
                , we continue to build long-term partnerships by delivering dependable, ethical,
                and value-driven HR solutions that exceed client expectations.
              </p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-5 leading-tight">
            Leadership That Puts People First
          </h1>
          <p className="text-black text-lg leading-relaxed">
            Meet the team guiding our mission, our values, and the way we work
            every single day.
          </p>
        </div>

        {/* Leadership messages */}
        <div className="max-w-6xl mx-auto px-6 pb-24 space-y-20">
          {leadership.map((person, index) => (
            <div
              key={person.name}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-3 border border-sky-300/40 rounded-2xl -z-10 hidden md:block" />
                <img
                  src={person.image}
                  alt={`${person.role} portrait`}
                  className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
                />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
                  Message from our {person.name}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                  {person.role}
                </h2>
                <div className="w-12 h-[3px] bg-sky-500 mb-6" />
                <p className="text-black leading-relaxed text-base md:text-lg">
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
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-3 border border-sky-300/40 rounded-2xl -z-10 hidden md:block" />
                <img
                  src={pillar.image}
                  alt={`${pillar.title} image`}
                  className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div
                key={pillar.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-black mb-3">{pillar.title}</h3>
                <div className="w-10 h-[3px] bg-sky-500 mb-4" />
                <p className="text-black leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Our Team */}
        <section className="w-full">
          <div className="max-w-5xl mx-auto px-6 pb-24">
            <h2 className="mb-12 text-center text-3xl font-bold text-black">
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
    );
}

export default Aboutus