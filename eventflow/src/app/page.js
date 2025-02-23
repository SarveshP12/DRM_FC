"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import { HomeIcon, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(true);
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
        const response = await fetch("/api/events/registered");
        const data = await response.json();
        setRegisteredEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchRegisteredEvents();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-auto font-['Inter', sans-serif] bg-gradient-to-b from-[#1a0a2e] to-[#111] text-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50">
      <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 space-y-12 pt-20">
        {/* Welcome Section */}
        <div className="flex flex-col items-center space-y-4">
          <HomeIcon size={80} className="text-blue-400" />
          <h1 className="text-5xl font-extrabold text-gray-100">Welcome to EventFLOW</h1>
          <p className="text-gray-400 text-lg">Discover and create amazing events effortlessly!</p>
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 space-y-12 pt-20">
        {/* Welcome Section */}
        <div className="flex flex-col items-center space-y-4">
          <HomeIcon size={80} className="text-blue-400" />
          <h1 className="text-5xl font-extrabold text-gray-100">Welcome to EventFLOW</h1>
          <p className="text-gray-400 text-lg">Discover and create amazing events effortlessly!</p>
        </div>

        {/* Tabs Section */}
        {/* Tabs Section */}
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center bg-gray-800 shadow-lg p-4 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-100">Your Registered Events</h2>
            <div className="relative flex space-x-4 bg-gray-700 p-2 rounded-lg overflow-hidden">
              {['upcoming', 'past'].map((tabName) => (
                <motion.button
                  key={tabName}
                  onClick={() => setTab(tabName)}
                  className={`relative z-10 px-5 py-2 transition-all rounded-lg font-medium text-lg ${
                    tab === tabName ? "text-white bg-blue-600 shadow-md" : "text-gray-300"
                  className={`relative z-10 px-5 py-2 transition-all rounded-lg font-medium text-lg ${
                    tab === tabName ? "text-white bg-blue-600 shadow-md" : "text-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={{ x: tab === "upcoming" ? 0 : 100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </motion.button>
              ))}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Registered Events List */}
        <div className="w-full max-w-4xl">
          {loading ? (
            <p className="text-gray-400 text-lg text-center mt-4">Loading...</p>
          ) : registeredEvents.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-gray-400 text-lg text-center mt-4">Loading...</p>
          ) : registeredEvents.length > 0 ? (
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {registeredEvents.map((event) => (
                <li
                  key={event.id}
                  className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-start space-y-2 border border-gray-700 hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-semibold text-gray-100">{event.name}</h3>
                  <p className="text-gray-400 text-sm">{event.date}</p>
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
            <p className="text-gray-400 text-lg text-center mt-4">No events registered yet.</p>
            <p className="text-gray-400 text-lg text-center mt-4">No events registered yet.</p>
          )}
        </div>

        {/* No Upcoming Events Section */}
        {!loading && registeredEvents.length === 0 && (
          <div className="flex flex-col items-center mt-10 space-y-4">
            <CalendarIcon size={100} className="text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-100">No Upcoming Events</h2>
            <p className="text-gray-400 text-lg">You have no upcoming events. Why not host one?</p>
        {!loading && registeredEvents.length === 0 && (
          <div className="flex flex-col items-center mt-10 space-y-4">
            <CalendarIcon size={100} className="text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-100">No Upcoming Events</h2>
            <p className="text-gray-400 text-lg">You have no upcoming events. Why not host one?</p>
          </div>
        )}
      </div>
    </div>
  );
}