import { Outlet } from "react-router-dom";
import AuditTabs from "./components/AuditTabs";

export default function AuditLayout() {
  return (
    <div className="space-y-6">
      <AuditTabs />

      <Outlet />
    </div>
  );
}
