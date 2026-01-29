import React from "react";

const NavBar = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">
            TaskManager
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <span>Made for busy people</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
