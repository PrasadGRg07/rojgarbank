import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Compass,
  Target,
  MessageCircle,
  FileText,
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  GraduationCap,
  ClipboardList,
  Handshake,
  Headphones,
  HelpCircle,
  ChartLine,
  Lightbulb,
  NotebookPen,
  BadgeCheck,
} from "lucide-react";

const stats = [
  { value: "3,200+", label: "Careers Guided", Icon: Users },
  { value: "1,500+", label: "Sessions Done", Icon: MessageCircle },
  { value: "94%", label: "Satisfaction Rate", Icon: Star },
  { value: "20+", label: "Expert Counselors", Icon: GraduationCap },
];

const features = [
  {
    title: "Career Path Mapping",
    desc: "Discover the roles and industries that truly fit your skills, interests, and personality.",
    Icon: Compass,
  },
  {
    title: "One-on-One Sessions",
    desc: "Speak directly with experienced career counselors who understand the Nepali job market.",
    Icon: MessageCircle,
  },
  {
    title: "Resume & Interview Guidance",
    desc: "Get personalized feedback on your resume and coaching to ace any interview.",
    Icon: FileText,
  },
  {
    title: "Skills Gap Analysis",
    desc: "Understand what skills you're missing for your target role and how to build them.",
    Icon: ClipboardList,
  },
  {
    title: "Salary & Negotiation Advice",
    desc: "Learn how to negotiate offers confidently and understand fair market compensation.",
    Icon: ChartLine,
  },
  {
    title: "Lifelong Career Support",
    desc: "Whether you're a student or a professional, get support at every career stage.",
    Icon: Lightbulb,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Book a Session",
    desc: "Choose a convenient time and an expert counselor matched to your career goals.",
    Icon: Headphones,
  },
  {
    step: "02",
    title: "Tell Us Your Goals",
    desc: "Share your background, aspirations, and any challenges you're facing.",
    Icon: Target,
  },
  {
    step: "03",
    title: "Get Your Plan",
    desc: "Receive a personalized career roadmap with clear, actionable next steps.",
    Icon: NotebookPen,
  },
  {
    step: "04",
    title: "Execute & Grow",
    desc: "Follow your plan with ongoing support from your counselor as you progress.",
    Icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: "Priya Rana",
    role: "Career Counselee, now Product Manager",
    quote:
      "The counselor helped me pivot from teaching to product management. I had a clear roadmap and landed the role in six months.",
    initials: "PR",
  },
  {
    name: "Dipesh K.C.",
    role: "Career Counselee, Engineering Student",
    quote:
      "I had no idea what direction to take after graduation. My session gave me confidence and a concrete plan.",
    initials: "DK",
  },
  {
    name: "Mira Thapa",
    role: "Career Counselee, Banking Professional",
    quote:
      "The salary negotiation advice alone was worth it. I got a better offer and know my worth now.",
    initials: "MT",
  },
];

const faqs = [
  {
    q: "How do career counseling sessions work?",
    a: "You book a one-on-one session with a counselor online or in person. In the session you discuss your goals, and the counselor provides a personalized career plan.",
  },
  {
    q: "Who is career counseling for?",
    a: "Anyone — students choosing a path, fresh graduates starting out, or professionals looking to switch careers or advance.",
  },
  {
    q: "Is my information confidential?",
    a: "Yes. All our sessions are private and confidential. Your personal and career information is never shared without your consent.",
  },
  {
    q: "How many sessions do I need?",
    a: "It varies by your goals. Many people benefit from a single planning session, while others prefer ongoing monthly guidance. Your counselor will advise.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const CareerCounseling = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full px-4 py-1.5 mb-6">
              <Compass className="w-4 h-4" /> Rojgar Bank Career Counseling
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Clarity in Your{" "}
              <span className="text-cyan-600">Career Journey</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Our expert counselors help you discover your strengths, map the
              right career path, and take confident, informed next steps —
              whether you're a student, graduate, or professional.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Book a Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/jobseeker/register"
                className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-7 py-3.5 rounded-full border border-gray-300 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                Create Your Profile
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {["PR", "DK", "MT"].map((ini) => (
                  <span
                    key={ini}
                    className="w-9 h-9 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-bold text-cyan-800"
                  >
                    {ini}
                  </span>
                ))}
              </div>
              <span>
                Guided <strong className="text-gray-800">3,200+</strong> careers so far
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
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white text-sm font-bold">
                  SK
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Sushil Karki</p>
                  <p className="text-xs text-gray-500">Senior Career Counselor</p>
                </div>
                <span className="ml-auto text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                  Available
                </span>
              </div>
              <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-100 space-y-3">
                <p className="text-sm font-semibold text-gray-800">Recommended Career Path</p>
                {[
                  { label: "Skills Assessment", pct: 95, Icon: BadgeCheck },
                  { label: "Market Research", pct: 80, Icon: Lightbulb },
                  { label: "Action Plan Ready", pct: 70, Icon: ClipboardList },
                ].map(({ label, pct, Icon }) => (
                  <div key={label}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-cyan-600" />
                      <p className="text-xs text-gray-600 flex-1">{label}</p>
                      <span className="text-xs font-bold text-cyan-700">{pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-cyan-600" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full py-3 transition-colors"
              >
                Start Your Session <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden sm:flex items-center gap-2">
              <Handshake className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Personalized Guidance</span>
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
            <span className="text-cyan-600 font-semibold text-sm">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Guidance at Every Step
            </h2>
            <p className="text-gray-600 mt-4">
              Personalized support designed around your unique goals.
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
              Your Path to Career Clarity
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
              Stories of Direction & Growth
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
            <Headphones className="w-10 h-10 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Feeling Stuck? Let's Talk.
            </h2>
            <p className="text-cyan-100 mt-4 text-lg">
              Book your first career counseling session and get a clear, personalized plan for your future.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-cyan-700 hover:bg-cyan-50 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Book a Session Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services/resume"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Polish My Resume
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

export default CareerCounseling;
