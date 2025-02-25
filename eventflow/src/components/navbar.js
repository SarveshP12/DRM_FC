"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Bell, Calendar, Ticket } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full p-4 flex justify-between items-center bg-transparent fixed top-0 left-0 z-10">
      {/* Logo */}
      <h1 className="text-white text-2xl font-bold">
        Event<span className="text-[#6a2c62]">FLOW</span>
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="#" className="flex items-center space-x-2 text-white hover:opacity-80">
          <Ticket size={18} />
          <span>Events</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-white hover:opacity-80">
          <Calendar size={18} />
          <span>Discovery</span>
        </a>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* When Signed Out - Show Sign Up & Login Buttons */}
        <SignedOut>
          <SignUpButton mode="modal">
            <div className="bg-[#6a2c62] text-white px-4 py-2 rounded-md hover:bg-[#4a1e4a] transition-colors">
              Sign Up
            </div>
          </SignUpButton>
          <SignInButton mode="modal">
            <div className="bg-transparent border border-[#6a2c62] text-[#6a2c62] px-4 py-2 rounded-md hover:bg-[#6a2c62] hover:text-white transition-colors">
              Login
            </div>
          </SignInButton>
        </SignedOut>

        {/* When Signed In - Show Create Event Button, Notification, and User Avatar */}
        <SignedIn>
          <Bell size={20} className="cursor-pointer text-white hover:opacity-80" />
          <div className="bg-white text-black rounded-full px-4 py-1 hover:bg-gray-200">
            Create Event
          </div>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
