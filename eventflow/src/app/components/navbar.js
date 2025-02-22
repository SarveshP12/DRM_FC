import React from "react";
import { Ticket, Calendar } from "lucide-react"; // Icons from Lucide-react

const Navbar = () => {
  return (
    <nav className="w-full p-4 flex justify-between items-center bg-transparent fixed top-6 left-1/2 transform -translate-x-1/2 max-w-5xl px-6 border-2 border-[#A0B4E5] rounded-full shadow-md">
      {/* Logo */}
      <h1 className="text-[#e8b878] text-2xl font-bold">
        Event<span className="text-white">FLOW</span>
      </h1>

      {/* Icons Section */}
      <div className="flex space-x-6 text-gray-300">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-all">
          <Ticket size={22} />
          <span className="text-sm">Events</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-all">
          <Calendar size={22} />
          <span className="text-sm">Calendars</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
