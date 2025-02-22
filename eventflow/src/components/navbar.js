"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ticket, Calendar, Bell } from "lucide-react";
import { 
  UserButton, 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton, 
  useAuth 
} from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth(); // Check if user is signed in

  const handleCreateEvent = () => {
    if (isSignedIn) {
      router.push('/create-event');  // Redirect to create event page
    } else {
      router.push('/eventflow/src/app/create-event/page.js'); // Redirect to sign-in page if not logged in
    }
  };

  return (
    <nav className="w-full px-4 flex justify-between items-center bg-white/10 fixed shadow-md">
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
          <span className="text-sm">Discovery</span>
        </Link>
      </div>

      {/* Authentication Section */}
      <div className="flex items-center gap-6">
        {/* Notification Bell Icon */}
        <button className="p-2 rounded-full hover:bg-[#d78a427f] transition-all">
          <Bell size={22} className="text-white" />
        </button>

        {/* Create Event Button */}
        <button 
          onClick={handleCreateEvent}
          className="p-2 text-sm text-white bg-transparent border border-[#6a2c62] rounded-full hover:bg-[#d78a427f] transition-all my-4"
        >
          Create Event
        </button>

        {/* Sign Up and Login Buttons */}
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="bg-[#6a2c625f] text-white p-2 my-2 rounded-full hover:bg-[#d78a427f] transition-colors">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="bg-transparent border border-[#6a2c625f] text-white p-2 my-2 rounded-full hover:bg-[#d78a427f] hover:text-white transition-colors">
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
