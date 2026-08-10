import React, { useState, useEffect } from 'react'
import image from '../assets/seeker.png'
import logo from '../assets/employee.png'
import { ArrowUp } from 'lucide-react'

const jobseekerfeatures = [
    "Rogjar Bank connects jobseekers with trusted employers, making it easier to discover genuine job opportunities across Nepal.",
    "The platform allows users to create a professional profile, upload their CV, and apply for multiple jobs with a single account.",
    "Rogjar Bank provides personalized job recommendations based on users' skills, qualifications, experience, and career interests.",
    "Jobseekers receive instant notifications about new job openings, application updates, and interview opportunities, helping them never miss an important career opportunity."
]

const employeefeatures = [
    "Rogjar Bank enables employers to post job vacancies quickly and reach thousands of qualified candidates across Nepal.",
    "Employers can search, filter, and shortlist candidates based on skills, experience, education, and location.",
    "The platform simplifies the recruitment process by allowing employers to manage applications and communicate with candidates in one place.",
    "Verified employer profiles help build trust and attract high-quality job applicants for every vacancy."
]

const Whyus = () => {
    const [activeTab, setActiveTab] = useState('jobseeker') 
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-4xl font-bold text-center text-cyan-700 mb-8">
                Why Rojgar Bank is Nepal's Trusted Career Platform
            </h2>


            <div className="flex justify-center mb-12">
                <div className="inline-flex border-2 border-cyan-600 rounded-full p-1">
                    <button
                        onClick={() => setActiveTab('jobseeker')}
                        className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${activeTab === 'jobseeker'
                                ? 'bg-cyan-600 text-white'
                                : 'bg-transparent text-cyan-600'
                            }`}
                    >
                        For Jobseekers
                    </button>
                    <button
                        onClick={() => setActiveTab('employer')}
                        className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${activeTab === 'employer'
                                ? 'bg-cyan-600 text-white'
                                : 'bg-transparent text-cyan-600'
                            }`}
                    >
                        For Employers
                    </button>
                </div>
            </div>

            {activeTab === 'jobseeker' ? (
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Jobseeker Side */}
                    <div>
                        <h3 className="text-2xl font-semibold text-cyan-700 mb-8">
                            For Jobseeker:
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-8">
                            {jobseekerfeatures.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="text-green-500 text-2xl mt-1">✔</div>
                                    <p className="text-gray-700 leading-8 text-justify">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src={image}
                            alt=""
                            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
                        />
                    </div>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Employer Side */}
                    <div>
                        <img
                            src={logo}
                            alt=""
                            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
                        />
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-cyan-700 mb-8">
                            For Employer:
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-8">
                            {employeefeatures.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="text-green-500 text-2xl mt-1">✔</div>
                                    <p className="text-gray-700 leading-8 text-justify">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Scroll to top button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center shadow-lg transition-colors duration-200 z-50"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </section>
    )
}

export default Whyus