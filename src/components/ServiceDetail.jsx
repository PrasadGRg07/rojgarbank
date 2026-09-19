import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Briefcase,
  Search,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Building2,
  Phone,
  Headphones,
  Network,
  HeartHandshake,
  HelpCircle,
  Users,
  FileCheck,
  Handshake,
  UserCheck,
  Wallet,
  ShieldCheck,
  GraduationCap,
  Lightbulb,
  LineChart,
  MessageSquare,
  Cpu,
  Layers,
  UsersRound,
  Megaphone,
  FileSearch,
  Clock,
  Trophy,
  Sparkles,
  FileText,
} from "lucide-react";

import img1 from "../assets/vacancy-management.png";
import img2 from "../assets/outsourcing-services.png";
import img3 from "../assets/recruitment-tools.png";
import img4 from "../assets/hr-consulting.png";

const services = {
  "vacancy-management": {
    slug: "vacancy-management",
    label: "Vacancy Announcement & Management Tools",
    title: "Vacancy Announcement & Management Tools",
    img: img1,
    description:
      "Our hiring and management tools simplify recruitment and employee tracking, helping businesses post jobs, manage candidates, and monitor workforce efficiently.",
    checkFeatures: [
      "Easy Job Posting and Tracking",
      "Advanced Candidate Search and Filters",
      "Centralized Employee Management Dashboard",
    ],
    stats: [
      { value: "10K+", label: "Jobs Posted", Icon: Megaphone },
      { value: "50K+", label: "Applications Tracked", Icon: FileSearch },
      { value: "3,000+", label: "Companies Using", Icon: Building2 },
      { value: "99.9%", label: "Uptime", Icon: Clock },
    ],
    features: [
      {
        title: "Easy Job Posting and Tracking",
        desc: "Create, publish, and manage job posts in minutes with a clean, intuitive interface.",
        Icon: Megaphone,
      },
      {
        title: "Advanced Candidate Search and Filters",
        desc: "Filter, sort, and find the right candidates by skills, location, experience, and more.",
        Icon: Search,
      },
      {
        title: "Centralized Employee Management Dashboard",
        desc: "Manage active employees, roles, and records from a single secure dashboard.",
        Icon: Layers,
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Create an Account",
        desc: "Register as an employer and set up your company profile in minutes.",
        Icon: UserCheck,
      },
      {
        step: "02",
        title: "Post Your Vacancy",
        desc: "Add the job title, description, requirements, and salary range.",
        Icon: ClipboardList,
      },
      {
        step: "03",
        title: "Review Applicants",
        desc: "Review, shortlist, and communicate with candidates from your dashboard.",
        Icon: Handshake,
      },
      {
        step: "04",
        title: "Hire & Manage",
        desc: "Convert the best candidate and manage them through the platform.",
        Icon: Trophy,
      },
    ],
    heroCard: {
      heading: "Your Hiring Pipeline",
      badge: "Active",
      items: [
        { label: "Job Post Live", pct: 100, Icon: CheckCircle2 },
        { label: "Applications Received", pct: 80, Icon: FileSearch },
        { label: "Candidates Shortlisted", pct: 45, Icon: UserCheck },
        { label: "Position Filled", pct: 30, Icon: Briefcase },
      ],
      footer: "One Dashboard, Full Control",
      footerIcon: Cpu,
    },
    faqs: [
      {
        q: "How long does it take to post a job?",
        a: "You can create and publish a job in under 5 minutes once your employer account is active.",
      },
      {
        q: "Can I post multiple vacancies at once?",
        a: "Yes. You can create, draft, and manage unlimited job posts from your employer dashboard.",
      },
      {
        q: "How do I track applications?",
        a: "Every application appears in your pipeline board where you can shortlist, message, and manage candidates.",
      },
      {
        q: "Can I manage my existing employees here?",
        a: "Yes, the employee management dashboard lets you store records, roles, and workforce details in one place.",
      },
    ],
  },
  outsourcing: {
    slug: "outsourcing",
    label: "Outsourcing Services",
    title: "Outsourcing Services",
    img: img2,
    description:
      "Flexible outsourcing solutions that help businesses manage staffing and HR operations while focusing on their core business.",
    checkFeatures: [
      "Payroll Management",
      "Staff Outsourcing",
      "Workforce Support",
    ],
    stats: [
      { value: "800+", label: "Staff Outsourced", Icon: Users },
      { value: "98%", label: "Client Retention", Icon: HeartHandshake },
      { value: "40+", label: "Industries Served", Icon: Building2 },
      { value: "12hrs", label: "Avg. Response Time", Icon: Clock },
    ],
    features: [
      {
        title: "Payroll Management",
        desc: "We handle payroll, tax, and compliance so salaries are always on time and correct.",
        Icon: Wallet,
      },
      {
        title: "Staff Outsourcing",
        desc: "Flexible staffing for short-term projects or long-term roles, at any scale.",
        Icon: UsersRound,
      },
      {
        title: "Workforce Support",
        desc: "Our HR team supports your outsourced staff with policies, issues, and engagement.",
        Icon: Headphones,
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Tell Us Your Needs",
        desc: "Share the roles, volume, and timeline for the staff you need.",
        Icon: MessageSquare,
      },
      {
        step: "02",
        title: "We Recruit & Screen",
        desc: "We source and vet candidates until you have the right team.",
        Icon: FileCheck,
      },
      {
        step: "03",
        title: "We Manage HR",
        desc: "Payroll, compliance, and employee support are handled end-to-end.",
        Icon: Wallet,
      },
      {
        step: "04",
        title: "You Focus on Growth",
        desc: "Your team runs smoothly while you focus on core business.",
        Icon: TrendingUp,
      },
    ],
    heroCard: {
      heading: "Outsourcing at a Glance",
      badge: "Managed for You",
      items: [
        { label: "Payroll Processing", pct: 100, Icon: Wallet },
        { label: "Compliance Handled", pct: 95, Icon: ShieldCheck },
        { label: "Staff Engaged", pct: 90, Icon: UsersRound },
        { label: "Client Satisfaction", pct: 98, Icon: HeartHandshake },
      ],
      footer: "End-to-End HR, Zero Stress",
      footerIcon: Handshake,
    },
    faqs: [
      {
        q: "Which roles can be outsourced?",
        a: "Almost any role — from administrative and customer support to technical, sales, and hospitality positions.",
      },
      {
        q: "Who manages the outsourced staff?",
        a: "Our HR team manages contracts, payroll, compliance, and day-to-day employee matters on your behalf.",
      },
      {
        q: "Can we scale staff up or down?",
        a: "Yes. Outsourcing gives you the flexibility to adjust your workforce based on project needs.",
      },
      {
        q: "Is outsourcing cost-effective?",
        a: "It reduces hiring, payroll, and HR administration costs while giving you access to vetted talent quickly.",
      },
    ],
  },
  recruitment: {
    slug: "recruitment",
    label: "Recruitment Tools & Services",
    title: "Recruitment Tools & Services",
    img: img3,
    description:
      "Our recruitment services help companies connect with qualified candidates through efficient sourcing, screening, and candidate matching.",
    checkFeatures: [
      "Large Candidate Pool",
      "Industry-Specific Recruitment",
      "Fast Hiring Process",
    ],
    stats: [
      { value: "100K+", label: "Candidate Pool", Icon: Users },
      { value: "2,400+", label: "Successful Placements", Icon: Briefcase },
      { value: "15+", label: "Industries Covered", Icon: Building2 },
      { value: "2 wks", label: "Avg. Time to Hire", Icon: Clock },
    ],
    features: [
      {
        title: "Large Candidate Pool",
        desc: "Tap into a database of 100,000+ registered job seekers across Nepal.",
        Icon: Users,
      },
      {
        title: "Industry-Specific Recruitment",
        desc: "Tailored sourcing for IT, banking, hospitality, healthcare, engineering, and more.",
        Icon: Building2,
      },
      {
        title: "Fast Hiring Process",
        desc: "Streamlined vetting and shortlisting that gets you to interviews quickly.",
        Icon: Clock,
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Share the Role",
        desc: "Tell us the role, requirements, and expectations.",
        Icon: Megaphone,
      },
      {
        step: "02",
        title: "We Source Candidates",
        desc: "We tap our pool and networks to find the best matches.",
        Icon: Search,
      },
      {
        step: "03",
        title: "We Shortlist & Screen",
        desc: "Candidates are screened and vetted before you meet them.",
        Icon: CheckCircle2,
      },
      {
        step: "04",
        title: "You Hire",
        desc: "Interview the best candidates and make your offer.",
        Icon: Handshake,
      },
    ],
    heroCard: {
      heading: "Recruitment Pipeline",
      badge: "In Progress",
      items: [
        { label: "Candidates Sourced", pct: 100, Icon: Users },
        { label: "Screened", pct: 70, Icon: FileCheck },
        { label: "Presented to You", pct: 40, Icon: UserCheck },
        { label: "Hired", pct: 25, Icon: Briefcase },
      ],
      footer: "The Right Talent, When You Need It",
      footerIcon: Network,
    },
    faqs: [
      {
        q: "How quickly can you find candidates?",
        a: "For most roles, we present shortlisted candidates within one to two weeks.",
      },
      {
        q: "Which industries do you recruit for?",
        a: "IT, banking and finance, hospitality, healthcare, sales, marketing, engineering, and more.",
      },
      {
        q: "Do you pre-screen candidates?",
        a: "Yes, every candidate is screened for skills, experience, and fit before being presented to you.",
      },
      {
        q: "Is recruitment free for job seekers?",
        a: "Yes. Our recruitment service is completely free for job seekers.",
      },
    ],
  },
  "hr-consulting": {
    slug: "hr-consulting",
    label: "HR Consulting",
    title: "HR Consulting",
    img: img4,
    description:
      "Our HR consulting services help businesses improve policies, employee development, workplace engagement, and workforce management.",
    stats: [
      { value: "120+", label: "Companies Advised", Icon: Building2 },
      { value: "250+", label: "Policies Developed", Icon: FileText },
      { value: "90%", label: "Engagement Lift", Icon: HeartHandshake },
      { value: "15+", label: "Years Combined Experience", Icon: GraduationCap },
    ],
    checkFeatures: [
      "HR Policy Development",
      "Employee Training",
      "Employee Engagement",
      "Retention Strategies",
    ],
    features: [
      {
        title: "HR Policy Development",
        desc: "Clear, compliant policies for hiring, leave, conduct, and everything in between.",
        Icon: FileText,
      },
      {
        title: "Employee Training",
        desc: "Practical training programs that build real, on-the-job skills.",
        Icon: GraduationCap,
      },
      {
        title: "Employee Engagement",
        desc: "Strategies and programs that keep your team motivated and aligned.",
        Icon: HeartHandshake,
      },
      {
        title: "Retention Strategies",
        desc: "Identify what drives turnover and build plans to keep your best talent.",
        Icon: Users,
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "Consultation",
        desc: "We review your current HR practices and goals.",
        Icon: MessageSquare,
      },
      {
        step: "02",
        title: "Assessment",
        desc: "We identify gaps in policies, engagement, and retention.",
        Icon: FileSearch,
      },
      {
        step: "03",
        title: "Strategy & Build",
        desc: "We design and implement practical HR solutions.",
        Icon: Lightbulb,
      },
      {
        step: "04",
        title: "Support & Optimize",
        desc: "We support rollout and refine as your team evolves.",
        Icon: LineChart,
      },
    ],
    heroCard: {
      heading: "Workplace Health",
      badge: "Improving",
      items: [
        { label: "Policy Coverage", pct: 100, Icon: FileText },
        { label: "Team Engaged", pct: 88, Icon: HeartHandshake },
        { label: "Training Completed", pct: 65, Icon: GraduationCap },
        { label: "People Retained", pct: 92, Icon: Users },
      ],
      footer: "A Workplace People Love",
      footerIcon: Sparkles,
    },
    faqs: [
      {
        q: "What does an HR audit include?",
        a: "Policy review, compliance check, engagement survey analysis, and a prioritized action plan.",
      },
      {
        q: "Can you help with one specific HR issue?",
        a: "Yes. You can engage us for a single project like a policy overhaul or engagement program.",
      },
      {
        q: "Do you provide training on-site?",
        a: "We offer both on-site and online training depending on your team's needs.",
      },
      {
        q: "Ideal for small businesses?",
        a: "Absolutely. Our consulting scales to fit small teams and growing companies.",
      },
    ],
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services[slug];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 bg-cyan-100 rounded-full px-4 py-1.5 mb-6">
              <Briefcase className="w-4 h-4" /> {service.label}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {service.title}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              {service.description}
            </p>

            <ul className="mt-8 space-y-4">
              {service.checkFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="text-base text-gray-700 font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
              >
                Talk to Our Team <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-7 py-3.5 rounded-full border border-gray-300 hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                View All Services
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {service.stats.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-full bg-cyan-200 border-2 border-white flex items-center justify-center text-xs font-bold text-cyan-800"
                  >
                    <s.Icon className="w-4 h-4" />
                  </span>
                ))}
              </div>
              <span>
                Trusted by <strong className="text-gray-800">100s of businesses</strong> across Nepal
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
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-gray-100 flex items-center justify-center bg-cyan-50">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100 hidden sm:flex items-center gap-2">
              <service.heroCard.footerIcon className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">
                {service.heroCard.footer}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {service.stats.map(({ value, label, Icon }) => (
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
            <span className="text-cyan-600 font-semibold text-sm">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Everything You Need in One Place
            </h2>
            <p className="text-gray-600 mt-4">
              Practical solutions that make hiring and HR easier.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map(({ title, desc, Icon }) => (
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
            <span className="text-cyan-600 font-semibold text-sm">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Simple, Clear, and Effective
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.howItWorks.map(({ step, title, desc, Icon }, idx) => (
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

      {/* ===== CTA ===== */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 to-cyan-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <Headphones className="w-10 h-10 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-cyan-100 mt-4 text-lg">
              Talk to our team today and see how this service can work for your
              business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-cyan-700 hover:bg-cyan-50 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Contact Our Team <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/employee/register"
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Register Your Company <Phone className="w-5 h-5" />
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
            {service.faqs.map((f) => (
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

export default ServiceDetail;