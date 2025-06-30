import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        GreenLoop
      </Link>
      {/* You can add nav links or logout button here later */}
    </header>
  );
};

export default Header;
