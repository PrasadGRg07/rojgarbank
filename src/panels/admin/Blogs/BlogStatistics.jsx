import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, XCircle, FileText } from "lucide-react";

import StatCard from "../components/StatCard";
import { getBlogs } from "../../../lib/blogApi";

export default function BlogStatistics() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const blogs = await getBlogs();

      setStats({
        total: blogs.length,
        published: blogs.filter((b) => b.is_published).length,
        draft: blogs.filter((b) => !b.is_published).length,
      });
    } catch (err) {
      console.error("Failed to load blog statistics", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <StatCard
        title="Total Blogs"
        value={stats.total}
        icon={BookOpen}
      />

      <StatCard
        title="Published Blogs"
        value={stats.published}
        icon={CheckCircle}
      />

      <StatCard
        title="Draft Blogs"
        value={stats.draft}
        icon={FileText}
      />

    </div>
  );
}
