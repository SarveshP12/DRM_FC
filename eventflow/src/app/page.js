"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import { HomeIcon, CalendarIcon } from "lucide-react";
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
        const response = await fetch("/api/events/registered"); // Adjust API route
        const data = await response.json();
        setRegisteredEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchRegisteredEvents();
  }, []);

  return (
    <div
      className="w-full min-h-screen overflow-auto"
      style={{
        backgroundImage: "linear-gradient(to bottom, #541f3b 0%, #d78a42 20%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col justify-center items-center text-white text-center px-4 space-y-12">
        {/* Icon and Welcome Message */}
        <div className="flex flex-col items-center">
          <HomeIcon size={80} className="text-gray-500" />
          <h1 className="text-3xl font-semibold mt-4">Welcome to EventFLOW</h1>
          <p className="text-gray-400 mt-2 text-lg">
            Discover and create amazing events effortlessly!
          </p>
        </div>

        {/* Tabs Section with Smooth Animation */}
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center bg-[#833939] p-3 rounded-lg">
            <h2 className="text-xl font-semibold">Your Registered Events</h2>

            <div className="relative flex space-x-4 bg-[#833939] p-2 rounded-lg">
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
        <div className="w-full max-w-4xl">
          {registeredEvents.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map((event) => (
                <li key={event.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">{event.name}</h3>
                  <p className="text-sm text-gray-300">{event.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 mt-2 text-lg text-center">No events registered yet.</p>
          )}
        </div>

        {/* No Upcoming Events Section */}
        {registeredEvents.length === 0 && (
          <div className="flex flex-col items-center mt-10">
            <CalendarIcon size={100} className="text-gray-600" />
            <h2 className="text-xl font-medium mt-4">No Upcoming Events</h2>
            <p className="text-gray-400 mt-2 text-lg">
              You have no upcoming events. Why not host one?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
