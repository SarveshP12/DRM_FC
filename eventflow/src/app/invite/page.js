"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import { CalendarIcon, Users, AlertTriangle, X } from "lucide-react";
import { motion } from "framer-motion";

export default function EventPage() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [tab, setTab] = useState("upcoming");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendInvite = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    const eventDetails = {
      email,
      eventTitle: "Tech Conference 2025",
      eventDate: "March 5, 2025",
      startTime: "10:00 AM",
      endTime: "4:00 PM",
      location: "Downtown Convention Center",
      description: "Join us for an exciting day of networking, talks, and innovation!",
      eventURL: "https://localhost:3000/invite",
    };

    setIsSending(true);
    try {
      const response = await fetch("/api/send-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventDetails),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Invitation sent successfully!");
        setEmail("");
        setIsInviteModalOpen(false);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to send invitation.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-auto font-['Inter', sans-serif] bg-gradient-to-b from-[#1a0a2e] to-[#111] text-gray-100">
      <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50">
        <Navbar />
      </div>

      <div className="min-h-screen flex flex-col items-center px-6 space-y-6 pt-24">
        <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col space-y-4 border border-gray-700 hover:shadow-xl transition">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="space-y-1">
              <p className="text-sm text-orange-400 font-bold flex items-center space-x-1">
                <span>● LIVE</span>
                <span>Time Not Set</span>
              </p>
              <h3 className="text-xl font-semibold">Event Name</h3>
              <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                <AlertTriangle size={16} />
                <span>Location Missing</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Users size={16} />
                <span>No guests</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-2">
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium" onClick={() => setIsInviteModalOpen(true)}>
              Invite
            </button>
          </div>
        </div>
      </div>

      {isInviteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white">Invite Guest</h3>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <label className="block text-gray-300">Guest Email</label>
              <input type="email" className="w-full p-2 bg-gray-800 text-white rounded-md" placeholder="Enter guest email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-4" onClick={sendInvite} disabled={isSending}>
                {isSending ? "Sending..." : "Send Invite"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
