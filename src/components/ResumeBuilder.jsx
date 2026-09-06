import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Download,
  Eye,
  LayoutTemplate,
  CheckCircle2,
  ArrowRight,
  Star,
  BadgeCheck,
  Percent,
  Users,
  PenLine,
  HelpCircle,
  Wand2,
} from "lucide-react";

const stats = [
  { value: "15,000+", label: "Resumes Created", Icon: Users },
  { value: "4.9/5", label: "User Rating", Icon: Star },
  { value: "70%", label: "More Interviews", Icon: Percent },
  { value: "500+", label: "ATS-Tested Templates", Icon: BadgeCheck },
];

const templates = [
  { name: "Classic", desc: "Clean & professional, perfect for corporate roles", Icon: LayoutTemplate },
  { name: "Modern", desc: "Bold accents & sleek layout for creative fields", Icon: Sparkles },
  { name: "Minimal", desc: "Simple and elegant, focuses on your experience", Icon: FileText },
  { name: "Executive", desc: "Polished senior-level format for leadership roles", Icon: BadgeCheck },
];

const features = [
  {
    title: "ATS-Friendly Templates",
    desc: "Every template is tested against applicant tracking systems so recruiters actually see your resume.",
    Icon: CheckCircle2,
  },
  {
    title: "Smart Content Suggestions",
    desc: "Get role-specific bullet points powered by industry best practices. Edit freely, zero blank-page stress.",
    Icon: Wand2,
  },
  {
    title: "Real-Time Preview",
    desc: "Watch your resume update live as you type. Preview on desktop, tablet, and mobile before you download.",
    Icon: Eye,
  },
  {
    title: "One-Click Export",
    desc: "Download your polished resume as a high-quality PDF or Word file instantly, anytime.",
    Icon: Download,
  },
  {
    title: "Secure & Private",
    desc: "Your data stays safe with us. Control who sees your resume and keep private details hidden.",
    Icon: ShieldCheck,
  },
  {
    title: "Professional Design",
    desc: "Match your personal brand with color themes, fonts, and layouts designed by HR experts.",
    Icon: Sparkles,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose a Template",
    desc: "Pick from 500+ recruiter-approved, ATS-friendly templates that match your industry.",
    Icon: LayoutTemplate,
  },
  {
    step: "02",
    title: "Add Your Details",
    desc: "Fill in your experience, skills, education, and more with helpful smart suggestions.",
    Icon: PenLine,
  },
  {
    step: "03",
    title: "Preview & Polish",
    desc: "Review your live preview, adjust colors and sections until it looks perfect.",
    Icon: Eye,
  },
  {
    step: "04",
    title: "Download & Apply",
    desc: "Export as PDF or Word and start applying to your dream jobs in minutes.",
    Icon: Download,
  },
];

const testimonials = [
  {
    name: "Sabina Shrestha",
    role: "Software Engineer at Kathmandu Tech",
    quote:
      "I landed three interviews in the first week after rebuilding my resume here. The ATS-friendly templates made a huge difference.",
    initials: "SS",
  },
  {
    name: "Rajan Thapa",
    role: "Marketing Executive",
    quote:
      "The smart suggestions saved me hours. My resume finally looks professional and recruiters keep complimenting it.",
    initials: "RT",
  },
  {
    name: "Anisha Karki",
    role: "Recent Graduate",
    quote:
      "As a fresh graduate I had no idea where to start. This builder made it simple and my profile now stands out.",
    initials: "AK",
  },
];

const faqs = [
  {
    q: "Is the resume builder really free?",
    a: "Yes, you can create and download a resume using our free tier with a selection of classic templates. Premium templates and advanced features are available with a subscription.",
  },
  {
    q: "Are the templates ATS-friendly?",
    a: "Absolutely. All our templates are tested against leading applicant tracking systems so your resume parses correctly and reaches human recruiters.",
  },
  {
    q: "Can I download my resume as a PDF?",
    a: "Yes, you can export your resume as a high-quality PDF or a Word document with one click, and download it as many times as you like.",
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. Your data is stored securely, and you control privacy settings to hide or show contact details and personal information.",
  },
];

const pricing = [
  {
    name: "Basic",
    price: "Free",
    period: "forever",
    features: [
      "1 professional template",
      "PDF download",
      "5 sections",
      "Standard support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "Rs. 999",
    period: "/year",
    features: [
      "All 500+ templates",
      "Unlimited downloads",
      "Smart content suggestions",
      "Multiple color themes & fonts",
      "Priority email support",
    ],
    highlighted: true,
  },
  {
    name: "Career Pro",
    price: "Rs. 1,999",
    period: "/year",
    features: [
      "Everything in Professional",
      "Cover letter builder",
      "AI resume review & score",
      "LinkedIn profile booster",
      "Dedicated career coach chat",
    ],
    highlighted: false,
  },
];

const faqsList = () => (
  <div className="grid gap-4 mt-10">
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
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const ResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4" /> Rojgar Bank Resume Builder
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Build a Resume That{" "}
              <span className="text-cyan-600">Gets You Hired</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Create a professional, ATS-friendly resume in minutes with
              recruiter-approved templates, smart content suggestions, and
              one-click PDF downloads. No design skills needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/jobseeker/register"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Build My Resume <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services/counseling"
                className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-7 py-3.5 rounded-full border border-gray-300 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                Get Career Advice
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {["SS", "RT", "AK"].map((ini) => (
                  <span
                    key={ini}
                    className="w-9 h-9 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-bold text-cyan-800"
                  >
                    {ini}
                  </span>
                ))}
              </div>
              <span>
                Trusted by <strong className="text-gray-800">15,000+</strong> job seekers
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
                <h3 className="font-semibold text-gray-800">Resume Preview</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                  ATS Ready
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white font-bold">
                    SS
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sabina Shrestha</p>
                    <p className="text-xs text-gray-500">Senior Software Engineer</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Experience", "Skills", "Projects"].map((s) => (
                    <div key={s} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-xs font-semibold text-cyan-700 mb-2">{s}</p>
                      <div className="space-y-1.5">
                        <div className="h-1.5 bg-gray-200 rounded-full w-full" />
                        <div className="h-1.5 bg-gray-200 rounded-full w-4/5" />
                        <div className="h-1.5 bg-gray-200 rounded-full w-3/5" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-white rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Resume Score</p>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-cyan-600 rounded-full" />
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-cyan-700">92</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden sm:flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">ATS Optimized</span>
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

      {/* ===== TEMPLATES ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">Templates</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Choose the Perfect Layout
            </h2>
            <p className="text-gray-600 mt-4">
              Professionally designed templates for every industry and career stage,
              all tested to pass applicant tracking systems.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map(({ name, desc, Icon }) => (
              <motion.div
                key={name}
                {...fadeUp}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
                <p className="text-sm text-gray-500 leading-6">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Everything You Need to Stand Out
            </h2>
            <p className="text-gray-600 mt-4">
              Powerful tools that make building a standout resume effortless.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ title, desc, Icon }) => (
              <motion.div
                key={title}
                {...fadeUp}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-cyan-200 hover:bg-cyan-50/40 transition-colors"
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
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Create Your Resume in 4 Easy Steps
            </h2>
            <p className="text-gray-600 mt-4">
              From blank page to job-ready resume in minutes.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map(({ step, title, desc, Icon }, idx) => (
              <motion.div
                key={step}
                {...fadeUp}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
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

      {/* ===== PRICING ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Simple, Transparent Plans
            </h2>
            <p className="text-gray-600 mt-4">
              Start free and upgrade when you're ready. No hidden fees.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {pricing.map(({ name, price, period, features, highlighted }) => (
              <motion.div
                key={name}
                {...fadeUp}
                className={`rounded-2xl p-8 flex flex-col relative ${
                  highlighted
                    ? "bg-cyan-600 text-white shadow-2xl scale-105"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`font-semibold text-lg mb-2 ${highlighted ? "text-white" : "text-gray-900"}`}>
                  {name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{price}</span>
                  <span className={highlighted ? "text-cyan-100 text-sm" : "text-gray-500 text-sm"}>
                    {" "}{period}
                  </span>
                </div>
                <ul className="space-y-3 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${highlighted ? "text-amber-300" : "text-cyan-600"}`}
                      />
                      <span className={highlighted ? "text-cyan-50" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/jobseeker/register"
                  className={`mt-8 inline-flex items-center justify-center gap-2 font-semibold rounded-full py-3 transition-colors ${
                    highlighted
                      ? "bg-white text-cyan-700 hover:bg-cyan-50"
                      : "bg-cyan-600 text-white hover:bg-cyan-700"
                  }`}
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Loved by Job Seekers
            </h2>
            <p className="text-gray-600 mt-4">
              See how professionals across Nepal landed their dream roles.
            </p>
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
          {faqsList()}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-cyan-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Ready to Build a Resume That Opens Doors?
            </h2>
            <p className="text-cyan-100 mt-4 text-lg">
              Join thousands of successful job seekers. It takes just minutes to get started — and it's free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/jobseeker/register"
                className="inline-flex items-center gap-2 bg-white text-cyan-700 hover:bg-cyan-50 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Build My Resume Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/jobseeker/login"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResumeBuilder;
