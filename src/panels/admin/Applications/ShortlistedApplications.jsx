import ApplicationListView from "./components/ApplicationListView";

export default function ShortlistedApplications() {
  return (
    <ApplicationListView
      title="Shortlisted Applications"
      description="Candidates selected for the next stage."
      status="Shortlisted"
    />
  );
}
