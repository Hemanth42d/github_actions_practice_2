import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "My Tasks",
      path: "/tasks",
      description: "All your tasks",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">TaskManager</h2>
            <p className="text-xs text-gray-500">Stay organized</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group hover:bg-gray-50 ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600 pl-2"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500 group-hover:text-gray-600">
                  {item.description}
                </div>
              </div>
              {isActive(item.path) && (
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="space-y-2">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <span className="text-lg">👤</span>
            <span>Profile</span>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <span>🚪</span>
            <span>Log Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
