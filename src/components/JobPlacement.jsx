import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Briefcase,
  Search,
  FileCheck,
  Handshake,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Building2,
  Phone,
  MessageCircle,
  Target,
  Headphones,
  Network,
  ClipboardList,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";

const stats = [
  { value: "2,400+", label: "Placements Made", Icon: Briefcase },
  { value: "96%", label: "Placement Success", Icon: TrendingUp },
  { value: "850+", label: "Partner Employers", Icon: Building2 },
  { value: "5.0/5", label: "Candidate Rating", Icon: Star },
];

const features = [
  {
    title: "Verification of Employers",
    desc: "Every employer is verified, so you only get genuine and trustworthy job opportunities.",
    Icon: FileCheck,
  },
  {
    title: "Direct Job Interviews",
    desc: "We set up interviews directly with hiring managers to fast-track your candidacy.",
    Icon: Handshake,
  },
  {
    title: "Free Placement Support",
    desc: "Our placement team guides you throughout the hiring process — completely free.",
    Icon: HeartHandshake,
  },
  {
    title: "Industry Network",
    desc: "Leverage our vast network of 850+ employers across hotels, agencies, IT, banks, and more.",
    Icon: Network,
  },
  {
    title: "Resume & Interview Prep",
    desc: "Polish your resume and ace interviews with dedicated coaching from our experts.",
    Icon: ClipboardList,
  },
  {
    title: "Zero Placement Fee",
    desc: "Find your ideal job without paying any placement fees to us. We work for you.",
    Icon: Search,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Register With Us",
    desc: "Create your free job seeker profile and upload your resume to get started.",
    Icon: ClipboardList,
  },
  {
    step: "02",
    title: "Tell Us Your Goals",
    desc: "Share your preferred role, industry, and salary expectations with our counselors.",
    Icon: Target,
  },
  {
    step: "03",
    title: "Get Matched",
    desc: "We match you with verified employers that fit your skills and aspirations.",
    Icon: Network,
  },
  {
    step: "04",
    title: "Get Placed",
    desc: "Attend interviews, receive offers, and start your dream job with our support.",
    Icon: Briefcase,
  },
];

const testimonials = [
  {
    name: "Bibek Maharjan",
    role: "Placed as IT Support at a Bank",
    quote:
      "Rojgar Bank handled everything — from interview prep to salary negotiation. I got placed within three weeks.",
    initials: "BM",
  },
  {
    name: "Sita Gurung",
    role: "Placed as Customer Care Executive",
    quote:
      "I had been job hunting for months. Their team matched me with a great company and supported me the whole way.",
    initials: "SG",
  },
  {
    name: "Nabin Shrestha",
    role: "Placed as Sales Officer",
    quote:
      "The process was completely free and professional. I finally found a stable job that matches my skills.",
    initials: "NS",
  },
];

const faqs = [
  {
    q: "Is the placement service really free?",
    a: "Yes. Our job placement service is completely free for job seekers. We charge no placement or registration fees from candidates.",
  },
  {
    q: "Which industries do you cover?",
    a: "We cover a wide range of industries including IT, banking and finance, hospitality, healthcare, sales, marketing, engineering, and more.",
  },
  {
    q: "How long does it take to get placed?",
    a: "It varies by role and market conditions, but many candidates receive interview calls within a few weeks of registering.",
  },
  {
    q: "Do you help with interview preparation?",
    a: "Yes. We provide resume polishing and interview coaching to help you present your best self to employers.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const JobPlacement = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full px-4 py-1.5 mb-6">
              <Briefcase className="w-4 h-4" /> Rojgar Bank Job Placement
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              We Help You Land the{" "}
              <span className="text-cyan-600">Right Job, Faster</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Join our free placement service and get matched with verified
              employers across Nepal. From interview prep to final offer, our
              dedicated team supports you every step of the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/jobseeker/register"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Register as Job Seeker <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services/resume"
                className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-7 py-3.5 rounded-full border border-gray-300 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                Build a Resume First
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {["BM", "SG", "NS"].map((ini) => (
                  <span
                    key={ini}
                    className="w-9 h-9 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-bold text-cyan-800"
                  >
                    {ini}
                  </span>
                ))}
              </div>
              <span>
                Placed <strong className="text-gray-800">2,400+</strong> professionals so far
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-gray-800">Placement Progress</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                  Active
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Profile Verified", pct: 100, Icon: CheckCircle2 },
                  { label: "Matched with Employers", pct: 85, Icon: Building2 },
                  { label: "Interview Scheduled", pct: 60, Icon: MessageCircle },
                  { label: "Offer Received", pct: 40, Icon: Briefcase },
                ].map(({ label, pct, Icon }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-cyan-600" />
                      <p className="text-sm font-medium text-gray-700 flex-1">{label}</p>
                      <span className="text-xs font-bold text-cyan-700">{pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-cyan-600" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden sm:flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">100% Free for Job Seekers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, Icon }) => (
            <motion.div
              key={label}
              {...fadeUp}
              className="flex flex-col items-center text-center"
            >
              <Icon className="w-8 h-8 text-cyan-600 mb-3" />
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Placement Support That Works for You
            </h2>
            <p className="text-gray-600 mt-4">
              We're not just a job board — we're your career partner.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ title, desc, Icon }) => (
              <motion.div
                key={title}
                {...fadeUp}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-cyan-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-6">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Your Journey to a New Job
            </h2>
            <p className="text-gray-600 mt-4">
              Four simple steps between you and your dream career.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map(({ step, title, desc, Icon }, idx) => (
              <motion.div
                key={step}
                {...fadeUp}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-gray-50 rounded-2xl p-7 border border-gray-100"
              >
                <span className="text-5xl font-bold text-cyan-100 absolute top-5 right-6">
                  {step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-cyan-600 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-6">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 to-cyan-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <Headphones className="w-10 h-10 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Need Help Finding a Job?
            </h2>
            <p className="text-cyan-100 mt-4 text-lg">
              Our placement counselors are ready to guide you. Reach out today and start your journey.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-cyan-700 hover:bg-cyan-50 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Contact Our Team <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/jobseeker/register"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Register Now <Phone className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Real People, Real Placements
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, quote, initials }) => (
              <motion.div
                key={name}
                {...fadeUp}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-7 mb-6">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-cyan-100 flex items-center justify-center text-sm font-bold text-cyan-700">
                    {initials}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="text-cyan-600 font-semibold text-sm">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="grid gap-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                  {f.q}
                </h3>
                <p className="text-gray-600 text-sm leading-7 pl-8">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobPlacement;
