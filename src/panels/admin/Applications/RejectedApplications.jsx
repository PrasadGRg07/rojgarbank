import ApplicationListView from "./components/ApplicationListView";

export default function RejectedApplications() {
  return (
    <ApplicationListView
      title="Rejected Applications"
      description="Applications that were not selected."
      status="Rejected"
    />
  );
}
