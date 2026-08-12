// Shared subscription plan definitions used by both
// WelcomeSubscriptionPopup and the full Subscription page.

export const PLANS = [
  {
    name: "free",
    label: "Free",
    price: "NPR 0",
    amount: 0,
    description: "Perfect for startups beginning their hiring journey.",
    features: [
      "1 Active Job",
      "Company Profile",
      "View Applicants",
      "Basic Dashboard",
      "Email Notifications",
    ],
    color: "slate",
    popular: false,
  },
  {
    name: "basic",
    label: "Basic",
    price: "NPR 999",
    amount: 999,
    description: "Ideal for small businesses hiring regularly.",
    features: [
      "5 Active Jobs",
      "300 Applicants",
      "Applicant Tracking",
      "Shortlist Candidates",
      "Analytics Dashboard",
      "Priority Email Support",
    ],
    color: "blue",
    popular: false,
  },
  {
    name: "professional",
    label: "Professional",
    price: "NPR 2,499",
    amount: 2499,
    description: "Powerful hiring tools for growing companies.",
    features: [
      "Unlimited Jobs",
      "Unlimited Applicants",
      "Resume Search",
      "Featured Job Posts",
      "Advanced ATS",
      "Verified Company Badge",
      "Team Members",
      "Hiring Reports",
    ],
    color: "indigo",
    popular: true,
  },
  {
    name: "enterprise",
    label: "Enterprise",
    price: "Custom",
    amount: 0,
    description: "Tailored recruitment solutions for enterprises.",
    features: [
      "Unlimited Everything",
      "Dedicated Account Manager",
      "API Access",
      "Custom Branding",
      "Multiple Recruiters",
      "24/7 Priority Support",
    ],
    color: "purple",
    popular: false,
  },
];

export const STATUS_BADGE = {
  pending:   { label: "Pending Review",          cls: "bg-yellow-100 text-yellow-700" },
  forwarded: { label: "Forwarded to Superadmin", cls: "bg-blue-100 text-blue-700"   },
  active:    { label: "Active",                   cls: "bg-green-100 text-green-700"  },
  expired:   { label: "Expired",                  cls: "bg-gray-100 text-gray-600"   },
  rejected:  { label: "Rejected",                 cls: "bg-red-100 text-red-700"     },
};
