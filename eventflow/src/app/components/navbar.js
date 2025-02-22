"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ticket, Calendar } from "lucide-react";
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center bg-transparent fixed top-6 left-1/2 transform -translate-x-1/2 px-10 border-2 border-[#A0B4E5] rounded-full shadow-md">
      
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
        <button
          onClick={() => router.push("/create-event")}
          className="px-8 py-3 text-lg text-white bg-transparent border border-[#A0B4E5] hover:bg-[#4a1e4a] transition-all rounded-md"
        >
          Create Event
        </button>

        <SignedOut>
          <SignUpButton mode="modal">
            <button className="bg-[#6a2c62] text-white px-4 py-2 rounded-md hover:bg-[#4a1e4a] transition-colors">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="bg-transparent border border-[#6a2c62] text-[#6a2c62] px-4 py-2 rounded-md hover:bg-[#6a2c62] hover:text-white transition-colors">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
