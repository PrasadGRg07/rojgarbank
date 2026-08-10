import { NavLink } from "react-router-dom";


export default function SettingMenu() {
  const menuItems = [
    { name: "My Profile", path: "" },
    { name: "Update Profile", path: "update-profile" },
    { name: "Change Password", path: "change-password" },
  ];
  return (

       <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-200 bg-white p-4">

      <div className="flex md:flex-col gap-3 overflow-x-auto">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === ""}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-4 py-3 text-left font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

      </div>

    </div>
  );
}