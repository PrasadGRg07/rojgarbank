import React from "react";
import {
  Search,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    id: 1,
    title: "AI Resume Search",
    description:
      "Quickly discover the best candidates using AI-powered semantic resume search.",
    icon: Search,
    gradient:
      "from-blue-600 via-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Job Management",
    description:
      "Post jobs, manage vacancies, and monitor applications from one dashboard.",
    icon: Briefcase,
    gradient:
      "from-violet-600 via-purple-500 to-fuchsia-500",
  },
  {
    id: 3,
    title: "Talent CRM",
    description:
      "Build relationships with candidates and maintain a long-term hiring pipeline.",
    icon: Users,
    gradient:
      "from-emerald-600 via-green-500 to-lime-500",
  },
];

function ProductCard({
  title,
  description,
  icon: Icon,
  gradient,
}) {
  return (
    <div
      className={`
        group
        overflow-hidden
        rounded-2xl
        bg-gradient-to-r
        ${gradient}
        p-6
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      `}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
        <Icon size={30} />
      </div>

      <h3 className="text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/90">
        {description}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          className="
            rounded-lg
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-900
            transition
            hover:scale-105
          "
        >
          Try Demo
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-white/30
            px-4
            py-2
            text-sm
            transition
            hover:bg-white/10
          "
        >
          Learn More

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

function AvailableProducts() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Available Products
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Explore premium hiring solutions to grow your recruitment process.
        </p>
      </div>

      <div className="grid gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(AvailableProducts);