import ApplicationListView from "./components/ApplicationListView";

export default function PendingApplications() {
  return (
    <ApplicationListView
      title="Pending Applications"
      description="Applications waiting for review."
      status="Pending"
    />
  );
}
