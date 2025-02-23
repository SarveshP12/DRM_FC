"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
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
    <div className="w-full min-h-screen overflow-auto font-['Inter', sans-serif] bg-gray-900 text-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 space-y-12 pt-20">

        {/* Tabs Section */}
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center bg-gray-800 shadow-lg p-4 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-100">Your Events</h2>
            <div className="relative flex space-x-4 bg-gray-700 p-2 rounded-lg">
              {["upcoming", "past"].map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => setTab(tabName)}
                  className={`relative z-10 px-5 py-2 transition-all rounded-lg font-medium text-lg ${
                    tab === tabName ? "text-white bg-blue-600 shadow-md" : "text-gray-300"
                  }`}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Registered Events List */}
        <div className="w-full max-w-4xl">
          {registeredEvents.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map((event) => (
                <li
                  key={event.id}
                  className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-start space-y-2 border border-gray-700 hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-gray-100">{event.name}</h3>
                  <p className="text-gray-400 text-sm">{event.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-lg text-center mt-4">No events created yet.</p>
          )}
        </div>

        {/* No Upcoming Events Section */}
        {registeredEvents.length === 0 && (
          <div className="flex flex-col items-center mt-10 space-y-4">
            <CalendarIcon size={100} className="text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-100">No Events</h2>
            <p className="text-gray-400 text-lg">You have no events created. Why not host one?</p>
          </div>
        )}
      </div>
    </div>
  );
}
