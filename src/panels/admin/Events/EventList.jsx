import { useState } from "react";

import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import EventTable from "./EventTable";
import EventStatistics from "./EventStatistics";

export default function EventList() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Events"
        subtitle="Manage all events"
        buttonText="Create Event"
        buttonLink="/admin/dashboard/events/create"
      />

      <EventStatistics />

      <div className="rounded-xl border bg-white p-4 shadow sm:p-5">
        <div className="mb-5">
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
