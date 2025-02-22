"use client"; 
import React, { useState, useEffect } from "react";
import { Ticket, Calendar } from "lucide-react"; // Icons from Lucide-react
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full p-4 flex justify-between items-center bg-transparent fixed z-10">
      <h1 className="text-white text-2xl font-bold user-select: none">
        Event<span className="text-[#6a2c62]">FLOW</span>
    <nav className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center bg-transparent fixed top-6 left-1/2 transform -translate-x-1/2 px-10 border-2 border-[#A0B4E5] rounded-full shadow-md">
      
      {/* Logo */}
      <h1 className="text-[#e8b878] text-2xl font-bold">
        Event<span className="text-white">FLOW</span>
      </h1>

      {/* Icons Section */}
      <div className="flex space-x-8 text-gray-300">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-all">
          <Ticket size={22} />
          <span className="text-sm">Events</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-all">
          <Calendar size={22} />
          <span className="text-sm">Calendars</span>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="flex items-center gap-6">
        {/* Create Event Button (Placed before Sign Up) */}
        <button className="px-8 py-3 text-lg text-white bg-transparent hover:bg-[#4a1e4a] transition-all">
          Create Event
        </button>

        <SignedOut>
          <SignUpButton mode="modal">
            <button
              className="bg-[#6a2c62] text-white px-4 py-2 rounded-md hover:bg-[#4a1e4a] transition-colors">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button
              className="bg-transparent border border-[#6a2c62] text-[#6a2c62] px-4 py-2 rounded-md hover:bg-[#6a2c62] hover:text-white transition-colors">
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
