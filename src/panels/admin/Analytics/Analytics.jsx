import AnalyticsCard from "./components/AnalyticsCard";
import analyticsData from "./data/analyticsData";

import {
  BarChart3,
  TrendingUp,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/20 p-3">
            <BarChart3 size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Analytics Center
            </h1>

            <p className="mt-1 text-sm text-blue-100">
              Monitor and analyze every aspect of Rojgar Bank.
            </p>
          </div>
        </div>


        <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/10 p-4">

          <TrendingUp size={22}/>

          <p className="text-sm">
            Get insights about users, jobs, applications,
            employers and platform performance.
          </p>

        </div>

      </div>



      {/* Analytics Cards */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {analyticsData.map((item) => (

          <AnalyticsCard
            key={item.id}
            {...item}
          />

        ))}

      </div>


    </div>
  );
}