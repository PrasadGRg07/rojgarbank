import React, { useRef, useState, useEffect } from 'react'
import { getTrainings, createEnrollment } from '../lib/trainingApi'
import Navbar from './Navbar'
import Footer from './Footer'
import {
    User,
    Clock,
    TrendingUp,
    Users,
    BookOpen,
    Award,
    CheckCircle2,
    Rocket,
    ShieldCheck,
    MousePointerClick,
    Target,
    X,
} from 'lucide-react'
import image1 from '../assets/ac.png'
import image2 from '../assets/re.png'

// Courses are now fetched dynamically from the backend

const stats = [
    { label: 'Trained', value: '500+', Icon: Users },
    { label: 'Courses Available', value: '7+', Icon: BookOpen },
    { label: 'Success Rate', value: '95%', Icon: Award },
    { label: 'Support Available', value: '24/7', Icon: Clock },
]

const reasons = [
    'Industry-certified instructors',
    'Hands-on practical training',
    'Job placement assistance',
    'Flexible scheduling options',
]

const whyChoose = [
    {
        title: 'Build In-Demand Skills',
        desc: "Get equipped with practical, job-ready skills aligned with today's industry needs.",
        Icon: Target,
    },
    {
        title: 'Learn from Industry Experts',
        desc: 'Train under professionals who bring real-world insights and experience to the classroom.',
        Icon: Users,
    },
]

const highlights = [
    {
        title: 'Fast-Track Learning',
        desc: 'Complete courses in weeks, not years',
        Icon: Rocket,
    },
    {
        title: 'Career Growth Guaranteed',
        desc: 'Placement support until you land the job',
        Icon: TrendingUp,
    },
    {
        title: 'Certified & Recognized',
        desc: 'Industry-recognized certificates upon completion',
        Icon: ShieldCheck,
    },
]

const Training = () => {
    const trainingSectionRef = useRef(null)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [enrollCourse, setEnrollCourse] = useState(null)
    const [enrollForm, setEnrollForm] = useState({ name: '', email: '', phone: '', courseOfInterest: '', preferredTime: '' })
    const [enrollSubmitted, setEnrollSubmitted] = useState(false)
    const [trainings, setTrainings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const data = await getTrainings()
                setTrainings(data)
            } catch (err) {
                console.error("Failed to fetch trainings:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchTrainings()
    }, [])

    const openEnroll = (course) => {
        setSelectedCourse(null)
        setEnrollSubmitted(false)
        setEnrollForm({ name: '', email: '', phone: '', courseOfInterest: course.title, preferredTime: '' })
        setEnrollCourse(course)
    }

    const handleEnrollSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!enrollCourse?.id) {
                alert("Cannot enroll at this time: Course ID missing.");
                return;
            }
            
            await createEnrollment(enrollCourse.id, {
                full_name: enrollForm.name,
                email: enrollForm.email,
                phone_number: enrollForm.phone,
                course_interest: enrollForm.courseOfInterest,
                preferred_time: enrollForm.preferredTime
            })
            
            setEnrollSubmitted(true)
        } catch (err) {
            console.error("Failed to submit enrollment:", err)
            alert("Failed to submit enrollment. Please try again.")
        }
    }

    return (
        <div className="relative bg-gradient-to-b from-slate-50 to-white">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-16 text-center">
                <h1 className="text-2xl md:text-4xl font-extrabold text-sky-500 leading-tight">
                    Discover Training Opportunities in Nepal with RogjarBank
                </h1>
                <h3 className="mt-2 text-lg md:text-xl font-semibold text-cyan-500">
                    Upgrade Your Skills Today
                </h3>

                <p className="mt-8 max-w-3xl mx-auto text-slate-600 leading-relaxed">
                    At RogjarBank, we offer a wide selection of professional training programs across Nepal
                    designed to boost your skills and career potential. Whether you're just starting out or
                    looking to advance in your field, our expert trainers are here to guide you every step of
                    the way. Your desire to learn, combined with our commitment to quality education, creates
                    the perfect path to career success.
                </p>

                <button
                    onClick={() =>
                        trainingSectionRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }
                    className="mt-8 inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-sm"
                >
                    Start Your Journey
                    <span aria-hidden="true">→</span>
                </button>
            </div>

            <div
                ref={trainingSectionRef}
                className="bg-slate-50 py-16 px-4 scroll-mt-24"
            >
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-sky-600">
                        Training Gallery
                    </h2>
                    <p className="mt-3 text-slate-500">
                        Explore our comprehensive training programs designed to accelerate your career growth.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {loading ? (
                        <div className="col-span-2 text-center py-10 text-slate-500">Loading training programs...</div>
                    ) : trainings.length === 0 ? (
                        <div className="col-span-2 text-center py-10 text-slate-500">No training programs available at the moment.</div>
                    ) : (
                        trainings.map((course, i) => {
                            const title = course.title || course.course_name
                            const instructor = course.trainer_name || 'Expert Instructor'
                            const duration = course.start_time ? new Date(course.start_time).toLocaleDateString() : 'Self-paced'
                            const price = 'Contact for Price'
                            const image = course.image ? course.image : (i % 2 === 0 ? image1 : image2)
                            const iconBg = i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                            
                            // Map for modal/enroll usage
                            const mappedCourse = { ...course, title, instructor, duration, price, image, iconBg }
                            
                            return (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
                            >
                                <div className={`relative h-40 ${iconBg} flex items-center justify-center`}>
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <span className="absolute top-3 right-3 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {price}
                                    </span>
                                </div>

                                <div className="p-5 flex flex-col gap-3 flex-1">
                                    <h3 className="font-bold text-slate-800">{title}</h3>

                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <User size={14} className="text-sky-500" />
                                        {instructor}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock size={14} className="text-sky-500" />
                                        {duration}
                                    </div>

                                    <div className="mt-auto flex flex-col gap-2 pt-2">
                                        <button
                                            onClick={() => setSelectedCourse(mappedCourse)}
                                            className="w-full border border-slate-200 text-sky-600 font-semibold text-sm py-2 rounded-md hover:bg-slate-50 transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => openEnroll(mappedCourse)}
                                            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2 rounded-md transition-colors"
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }))}
                </div>
            </div>

            {/* Ready to Transform Your Career */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 my-10 mx-10">
                <div className="bg-white py-20 px-4">
                    <div className="max-w-5xl mx-auto text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-sky-600">
                            Ready to Transform Your Career?
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-slate-500">
                            Join hundreds of professionals across Nepal who have advanced their careers through our
                            training programs.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left column: stats + why choose us */}
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map(({ label, value, Icon }, i) => (
                                    <div
                                        key={i}
                                        className="group bg-slate-50 rounded-xl border border-slate-100 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 hover:border-sky-200 hover:bg-white cursor-pointer"
                                    >
                                        <Icon size={22} className="mx-auto text-sky-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                                        <p className="mt-3 text-2xl font-extrabold text-slate-800">{value}</p>
                                        <p className="mt-1 text-sm text-slate-500">{label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-cyan-50/60 rounded-xl border border-cyan-100 p-6">
                                <h3 className="font-bold text-slate-800">Why Choose RogjarBank?</h3>
                                <ul className="mt-3 flex flex-col gap-2">
                                    {reasons.map((reason, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right column: CTA card */}
                        <div className="relative rounded-2xl bg-gradient-to-br from-sky-600 via-sky-600 to-cyan-500 text-white p-8 overflow-hidden">
                            <span className="inline-flex items-center gap-2 bg-white/15 text-xs font-semibold px-3 py-1 rounded-full">
                                ⭐ Top Rated Training Platform
                            </span>

                            <h3 className="mt-5 text-2xl md:text-3xl font-extrabold leading-tight">
                                Launch Your Career
                                <br />
                                <span className="text-yellow-300">to the Next Level</span>
                            </h3>

                            <p className="mt-4 text-sm text-white/90 leading-relaxed">
                                Enroll in any of our industry-leading courses and gain the skills employers are
                                looking for. Real projects, real mentors, real results.
                            </p>

                            <div className="mt-6 flex flex-col gap-4">
                                {highlights.map(({ title, desc, Icon }, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="shrink-0 bg-white/15 rounded-lg p-2">
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{title}</p>
                                            <p className="text-xs text-white/80">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-xs text-white/80">
                                <MousePointerClick size={14} />
                                Click "Enroll Now" on any course in the gallery above to get started
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Training */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-sky-600">
                        Why Choose Training at RogjarBank?
                    </h2>
                    <p className="mt-3 text-slate-500">
                        Discover what makes our training programs stand out and how we help you achieve
                        your career goals.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {whyChoose.map(({ title, desc, Icon }, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl border border-slate-200 p-6"
                        >
                            <div className="w-11 h-11 rounded-lg bg-sky-50 flex items-center justify-center">
                                <Icon size={22} className="text-sky-600" strokeWidth={1.75} />
                            </div>
                            <h3 className="mt-4 font-bold text-slate-800">{title}</h3>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Footer />
            </div>

            {/* View Details Modal */}
            {selectedCourse && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4"
                    onClick={() => setSelectedCourse(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`relative h-40 ${selectedCourse.iconBg} flex items-center justify-center rounded-t-2xl overflow-hidden`}>
                            <img
                                src={selectedCourse.image}
                                alt={selectedCourse.title}
                                className="h-full w-full object-cover"
                            />
                            <span className="absolute top-3 right-3 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {selectedCourse.price}
                            </span>
                            <button
                                onClick={() => setSelectedCourse(null)}
                                aria-label="Close"
                                className="absolute top-3 left-3 bg-white/90 hover:bg-white text-slate-600 rounded-full p-1.5 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-800">{selectedCourse.title}</h3>

                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-sky-500" />
                                    {selectedCourse.instructor}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-sky-500" />
                                    {selectedCourse.duration}
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                {selectedCourse.description}
                            </p>

                            {selectedCourse.topics && (
                                <div>
                                    <h4 className="font-semibold text-slate-800 text-sm mb-2">What you'll learn</h4>
                                    <ul className="flex flex-col gap-2">
                                        {selectedCourse.topics.map((topic, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex flex-col gap-2 pt-2">
                                <button
                                    onClick={() => openEnroll(selectedCourse)}
                                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2.5 rounded-md transition-colors"
                                >
                                    Enroll Now
                                </button>
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="w-full border border-slate-200 text-slate-600 font-semibold text-sm py-2.5 rounded-md hover:bg-slate-50 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Enroll Now Modal */}
            {enrollCourse && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4"
                    onClick={() => setEnrollCourse(null)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Enroll Now</h3>
                                <p className="text-sm text-slate-500 mt-1">{enrollCourse.title} · {enrollCourse.price}</p>
                            </div>
                            <button
                                onClick={() => setEnrollCourse(null)}
                                aria-label="Close"
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {enrollSubmitted ? (
                            <div className="mt-6 flex flex-col items-center text-center gap-3 py-6">
                                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center">
                                    <CheckCircle2 size={26} className="text-sky-600" />
                                </div>
                                <h4 className="font-bold text-slate-800">You're enrolled!</h4>
                                <p className="text-sm text-slate-500">
                                    We've received your details for {enrollCourse.title}. Our team will reach out
                                    to confirm your seat shortly.
                                </p>
                                <button
                                    onClick={() => setEnrollCourse(null)}
                                    className="mt-2 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2.5 rounded-md transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleEnrollSubmit} className="mt-5 flex flex-col gap-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Full name</label>
                                    <input
                                        type="text"
                                        required
                                        value={enrollForm.name}
                                        onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                                        className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={enrollForm.email}
                                        onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                                        className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={enrollForm.phone}
                                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                                        className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        placeholder="98XXXXXXXX"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">Course of interest</label>
                                    <select
                                        required
                                        value={enrollForm.courseOfInterest}
                                        onChange={(e) => setEnrollForm({ ...enrollForm, courseOfInterest: e.target.value })}
                                        className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    >
                                        <option value="" disabled>Select a course</option>
                                        {trainings.map((c, i) => (
                                            <option key={i} value={c.title || c.course_name}>{c.title || c.course_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">Preferred time</label>
                                    <select
                                        required
                                        value={enrollForm.preferredTime}
                                        onChange={(e) => setEnrollForm({ ...enrollForm, preferredTime: e.target.value })}
                                        className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    >
                                        <option value="" disabled>Select a time</option>
                                        <option value="Morning">Morning</option>
                                        <option value="Evening">Evening</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-2 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2.5 rounded-md transition-colors"
                                >
                                    Confirm Enrollment
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Training