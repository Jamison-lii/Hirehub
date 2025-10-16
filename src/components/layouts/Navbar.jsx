import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return <div className="sticky top-0 z-30 bg-transparent py-2">
      <div className="container mx-auto px-3">
        <div className="mx-auto w-full max-w-4xl h-12 flex items-center justify-between rounded-full border border-gray-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-3 shadow-sm">
          <Link to='/dashboard' className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block"></span>
            <h2 className="text-[15px] font-semibold text-blue-600 leading-none">HireHub</h2>
          </Link>

          <div className="scale-90 origin-right">
            <ProfileInfoCard />
          </div>
        </div>
      </div>
    </div>
};

export default Navbar;
