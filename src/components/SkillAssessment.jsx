import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Gauge,
  Target,
  ClipboardCheck,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Star,
  Award,
  BrainCircuit,
  FileSearch,
  ListChecks,
  LineChart,
  Timer,
  HelpCircle,
  BadgeCheck,
  PieChart,
} from "lucide-react";

const stats = [
  { value: "5,000+", label: "Assessments Taken", Icon: ClipboardCheck },
  { value: "120+", label: "Skill Dimensions", Icon: Gauge },
  { value: "98%", label: "Match Accuracy", Icon: BadgeCheck },
  { value: "45 min", label: "Average Time", Icon: Timer },
];

const features = [
  {
    title: "Comprehensive Skill Mapping",
    desc: "Measure technical, soft, and behavioral skills across 120+ dimensions relevant to today's jobs.",
    Icon: Gauge,
  },
  {
    title: "Instant & Accurate Results",
    desc: "Get your personalized skill profile immediately with a clear breakdown of strengths and gaps.",
    Icon: LineChart,
  },
  {
    title: "Career Match Score",
    desc: "See how well your skills align with specific job roles and industries you're targeting.",
    Icon: Target,
  },
  {
    title: "Personalized Roadmap",
    desc: "Receive a tailored learning plan to close skill gaps and boost your employability.",
    Icon: FileSearch,
  },
  {
    title: "Certified Report",
    desc: "Download a verified skill report to share with employers and strengthen your applications.",
    Icon: Award,
  },
  {
    title: "Industry Benchmarks",
    desc: "Compare your results against professionals in your field to know exactly where you stand.",
    Icon: PieChart,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Start the Assessment",
    desc: "Choose your area of interest and begin a short, engaging skills assessment.",
    Icon: ClipboardCheck,
  },
  {
    step: "02",
    title: "Answer & Perform",
    desc: "Complete a mix of scenario-based and knowledge questions. There are no wrong answers — just insights.",
    Icon: BrainCircuit,
  },
  {
    step: "03",
    title: "Get Your Report",
    desc: "Instantly view your skill profile, career matches, and gap analysis.",
    Icon: ListChecks,
  },
  {
    step: "04",
    title: "Act on Your Plan",
    desc: "Follow your personalized development roadmap and track your improvement over time.",
    Icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: "Kiran Basnet",
    role: "Assessed & placed as Data Analyst",
    quote:
      "The assessment showed me exactly which analytical skills to improve. Six months later I landed a data role.",
    initials: "KB",
  },
  {
    name: "Ashma Shakya",
    role: "Skills Assessment User",
    quote:
      "I finally understood my strengths and the roles that suit them. The career match score was spot on.",
    initials: "AS",
  },
  {
    name: "Prakash Adhikari",
    role: "Assessed before switching careers",
    quote:
      "The personalized roadmap made my transition from retail to tech so much easier to navigate.",
    initials: "PA",
  },
];

const faqs = [
  {
    q: "How long does the assessment take?",
    a: "Most assessments take around 30 to 45 minutes. You can complete it at your own pace and pause and resume anytime.",
  },
  {
    q: "Is the assessment free?",
    a: "Yes, a basic skills assessment is free for registered job seekers. Advanced reports and detailed roadmaps are available with a subscription.",
  },
  {
    q: "How accurate is the skill report?",
    a: "Our methodology is built on industry frameworks and benchmarked against professionals in each field, giving reliable and actionable insights.",
  },
  {
    q: "Can employers see my results?",
    a: "Only if you choose to share them. You can include your skill report in applications or keep it completely private.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const SkillAssessment = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full px-4 py-1.5 mb-6">
              <Gauge className="w-4 h-4" /> Rojgar Bank Skill Assessment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Know Your Strengths,{" "}
              <span className="text-cyan-600">Land the Right Role</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Take our science-backed skill assessment to discover what you're
              great at, identify skill gaps, and get a personalized roadmap to
              career success.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/jobseeker/register"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Start Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services/counseling"
                className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-7 py-3.5 rounded-full border border-gray-300 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                Talk to a Counselor
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {["KB", "AS", "PA"].map((ini) => (
                  <span
                    key={ini}
                    className="w-9 h-9 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-bold text-cyan-800"
                  >
                    {ini}
                  </span>
                ))}
              </div>
              <span>
                <strong className="text-gray-800">5,000+</strong> assessments completed
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
                <h3 className="font-semibold text-gray-800">Skill Profile</h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                  High Match
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Communication", pct: 92, Icon: BadgeCheck },
                  { label: "Technical Skills", pct: 78, Icon: Gauge },
                  { label: "Problem Solving", pct: 85, Icon: BrainCircuit },
                  { label: "Leadership", pct: 70, Icon: Target },
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
              <div className="mt-4 bg-gradient-to-r from-cyan-50 to-white rounded-xl p-4 border border-cyan-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">Career Match Score</p>
                  <span className="text-2xl font-bold text-cyan-700">86</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden sm:flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Certified Report</span>
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
            <span className="text-cyan-600 font-semibold text-sm">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Unlock Your Full Potential
            </h2>
            <p className="text-gray-600 mt-4">
              Powerful insights that turn unknown talents into career opportunities.
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
              From Assessment to Action
            </h2>
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-600 font-semibold text-sm">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Transformed Careers
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

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-cyan-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <Award className="w-10 h-10 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Discover Your Career Superpowers
            </h2>
            <p className="text-cyan-100 mt-4 text-lg">
              Take the first step toward a career that truly fits you. It's quick, easy, and free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/jobseeker/register"
                className="inline-flex items-center gap-2 bg-white text-cyan-700 hover:bg-cyan-50 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Take the Assessment <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services/resume"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Build a Resume
              </Link>
            </div>
          </motion.div>
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

export default SkillAssessment;
