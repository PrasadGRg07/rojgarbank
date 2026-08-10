import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const pageTitle = location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {pageTitle || "Dashboard"}
      </h1>

      <p className="text-gray-500 mt-1">
        Welcome to the Super Admin Panel
      </p>
    </div>
  );
};

export default Header;