import { BookOpen } from "lucide-react";

import AnalyticsPageHeader from "./components/AnalyticsPageHeader";
import KPIStatCard from "./components/KPIStatCard";
import ChartContainer from "./components/ChartContainer";

import blogAnalyticsData from "./data/blogAnalyticsData";

import BlogPostsChart from "./charts/BlogPostsChart";
import BlogCategoryChart from "./charts/BlogCategoryChart";
import BlogViewsChart from "./charts/BlogViewsChart";

const topBlogs = [
  {
    title: "Top Interview Tips for Freshers",
    category: "Career",
    views: "18,420",
  },
  {
    title: "Top 10 IT Jobs in Nepal",
    category: "Technology",
    views: "16,950",
  },
  {
    title: "How to Build a Professional CV",
    category: "Career",
    views: "15,730",
  },
  {
    title: "Best Programming Languages in 2026",
    category: "Technology",
    views: "14,280",
  },
  {
    title: "Soft Skills Every Employee Needs",
    category: "Education",
    views: "12,900",
  },
];

export default function BlogAnalytics() {
  return (
    <div className="space-y-6">
      <AnalyticsPageHeader
        title="Blog Analytics"
        description="Analyze blog performance, publishing activity, reader engagement and content trends."
        icon={BookOpen}
      />

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {blogAnalyticsData.map((item) => (
          <KPIStatCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartContainer
          title="Monthly Blog Posts"
          subtitle="Publishing activity over time"
        >
          <BlogPostsChart />
        </ChartContainer>

        <ChartContainer
          title="Blog Categories"
          subtitle="Content distribution"
        >
          <BlogCategoryChart />
        </ChartContainer>
      </div>

      {/* Bottom */}
      <div className="grid gap-6 xl:grid-cols-3">
        <ChartContainer
          title="Monthly Blog Views"
          subtitle="Reader engagement"
          height="h-96"
        >
          <BlogViewsChart />
        </ChartContainer>

        <div className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-semibold">
              Most Viewed Blogs
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Top performing articles based on total views.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Blog Title
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Views
                  </th>
                </tr>
              </thead>

              <tbody>
                {topBlogs.map((blog) => (
                  <tr
                    key={blog.title}
                    className="border-t"
                  >
                    <td className="px-6 py-4 font-medium">
                      {blog.title}
                    </td>

                    <td className="px-6 py-4">
                      {blog.category}
                    </td>

                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {blog.views}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}