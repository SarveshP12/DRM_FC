"use client"; 
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";

export default function Home() {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Apply blur only if search bar overlaps navbar (60px)
      setIsBlurred(scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="w-full min-h-screen overflow-auto"
      style={{
        backgroundImage: "linear-gradient(to bottom, #541f3b 0%, #d78a42 20%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>

      {/* Main Content (Centered) */}
      <div className="h-fit flex justify-center text-white text-center mt-20 px-4">
        {/* Search Bar */}
        <div className={`w-[500px] max-w-xl transition-all duration-300 ${isBlurred ? "blur-md opacity-60" : ""}`}>
          <input 
            type="text" 
            placeholder="Search for events..." 
            className="w-full px-6 py-3 text-white placeholder-gray-300  rounded-full border-2 border-[#A0B4E5] shadow-md bg-transparent focus:outline-none focus:border-[#e8b878]"
          />
        </div>
      </div>

      {/* Dummy Content to Enable Scrolling */}
      <div className="h-[200vh] flex items-center justify-center">
        <p className="text-xl opacity-80">Scroll Down to See Effect</p>
      </div>
    </div>
  );
}
