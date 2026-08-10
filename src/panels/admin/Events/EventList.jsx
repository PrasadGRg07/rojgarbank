import { useState } from "react";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import EventTable from "./EventTable";
import EventStatistics from "./EventStatistics";

export default function EventList() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">

      <PageHeader
        title="Events"
        subtitle="Manage all events"
          />
          <EventStatistics />


      <div className="bg-white rounded-xl shadow border p-5">

        <div className="flex justify-between items-center mb-5">

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
          />

        </div>

        <EventTable search={search} />

      </div>

    </div>
  );
}