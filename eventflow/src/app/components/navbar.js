"use client";
import React from "react";
import { Ticket, Calendar } from "lucide-react"; // Icons from Lucide-react
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full px-4 flex justify-between items-center bg-white/10 backdrop-filter bg-blur fixed shadow-md">
      {/* Logo */}
      <Link href="/" className="text-[#e8b878] text-2xl font-bold">
        Event<span className="text-white">FLOW</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-300">
        <Link href="/events" className="flex items-center space-x-1 cursor-pointer hover:text-white transition-all">
          <Ticket size={22} />
          <span className="text-sm">Events</span>
        </Link>
        <Link href="/calendar" className="flex items-center space-x-1 cursor-pointer hover:text-white transition-all">
          <Calendar size={22} />
          <span className="text-sm">Calendar</span>
        </Link>
      </div>

      {/* Authentication Section */}
      <div className="flex items-center gap-6">
        {/* Create Event Button */}
        <button className="p-2 text-lg text-white bg-transparent border border-[#6a2c62] rounded-full hover:bg-[#d78a427f] transition-all">
          Create Event
        </button>

        {/* Sign Up and Login Buttons */}
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="bg-[#6a2c62] text-white p-2 my-2 rounded-full hover:bg-[#d78a427f] transition-colors">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="bg-transparent border border-[#6a2c62] text-white p-2 my-2 rounded-full hover:bg-[#d78a427f] hover:text-white transition-colors">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        {/* User Button */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;