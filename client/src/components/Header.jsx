import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-7xl font-bold text-gray-900 flex w-full">GreenLoopX</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
