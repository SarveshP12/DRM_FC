"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [tab, setTab] = useState("upcoming");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch registered events
  useEffect(() => {
    async function fetchRegisteredEvents() {
      try {
        const response = await fetch("/api/events/registered");
        const data = await response.json();
        setRegisteredEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchRegisteredEvents();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-auto bg-gradient-to-r from-[#d4145a] via-[#9035a1] to-[#2a1a7c]">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-opacity-80">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col justify-center items-center text-white text-center px-4 space-y-12">

        {/* Tabs Section with Smooth Animation */}
        <div className="w-full max-w-4xl">
  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-[#d4145a] via-[#9035a1] to-[#2a1a7c]">
    <h2 className="text-xl font-semibold text-white">Your Events</h2>

    <div className="relative flex space-x-4 p-2 rounded-lg bg-opacity-20">
      {["upcoming", "past"].map((tabName) => (
        <button
          key={tabName}
          onClick={() => setTab(tabName)}
          className={`relative z-10 px-4 py-2 transition-all ${
            tab === tabName ? "text-white font-semibold" : "text-gray-300"
          }`}
        >
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
        </button>
      ))}

      {/* Animated Background */}
      <motion.div
        className="absolute top-0 bottom-0 w-24 bg-gray-800 rounded-lg"
        layoutId="active-tab"
        initial={false}
        animate={{
          left: tab === "upcoming" ? "0%" : "50%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  </div>
</div>


        {/* Registered Events List */}
        

        {/* No Upcoming Events Section */}
      </div>
    </div>
  );
}
