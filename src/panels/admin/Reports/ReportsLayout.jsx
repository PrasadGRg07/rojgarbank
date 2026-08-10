import { Outlet } from "react-router-dom";
import ReportsNavigation from "./components/ReportsNavigation";

export default function ReportsLayout() {
  return (
    <div className="space-y-6">
      <ReportsNavigation />
      <Outlet />
    </div>
  );
}
