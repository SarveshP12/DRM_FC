"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api"; // Import Convex API

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requireApproval, setRequireApproval] = useState(false);
  const [coords, setCoords] = useState({ lat: 51.505, lon: -0.09 }); // Store lat/lon for event

  // Convex mutation
  const createEvent = useMutation(api.events.createEvent);

  // Leaflet Map Refs
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([coords.lat, coords.lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
      markerRef.current = L.marker([coords.lat, coords.lon]).addTo(mapRef.current);
    }
  }, []);

  // Update Map Location When Location Input Changes
  useEffect(() => {
    if (location && mapRef.current && markerRef.current) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setCoords({ lat, lon });
            mapRef.current.setView([lat, lon], 13);
            markerRef.current.setLatLng([lat, lon]);
          }
        })
        .catch((error) => {
          console.error("Error geocoding location:", error);
        });
    }
  }, [location]);

  const handleCreateEvent = async () => {
    try {
      const newEvent = {
        title: eventName,
        date: {
          start: startDate,
          end: endDate || null,
          isFullDay: !startDate.includes("T"),
        },
        time: startDate.includes("T") ? startDate.split("T")[1] : null,
        location: `${location} (${coords.lat}, ${coords.lon})`,
        capacity: null, // Can be updated if needed
        createdBy: "user-token-identifier", // Replace with actual user token
        inviteLink: "generated-link", // Generate if needed
        sharedMedia: [],
      };

      await createEvent(newEvent);
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#4A1F1F] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-[#5C1E1E] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Event</h1>

        {/* Event Banner */}
        <div className="flex justify-center mb-6">
          <img
            src="https://source.unsplash.com/500x300/?rocket,space"
            alt="Event"
            className="rounded-lg w-full max-w-md"
          />
        </div>

        {/* Event Name */}
        <input
          type="text"
          placeholder="Event Name"
          className="w-full p-3 bg-[#3B1818] rounded-md mb-4 text-white"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        {/* Date & Time Pickers */}
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-1/2">
            <label>Start Date</label>
            <input
              type="datetime-local"
              className="p-3 bg-[#3B1818] rounded-md text-white"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label>End Date</label>
            <input
              type="datetime-local"
              className="p-3 bg-[#3B1818] rounded-md text-white"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Location */}
        <input
          type="text"
          placeholder="Add Event Location"
          className="w-full p-3 bg-[#3B1818] rounded-md mb-4 text-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="Add Description"
          className="w-full p-3 bg-[#3B1818] rounded-md mb-4 text-white"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Event Options */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Event Options</h2>
          <div className="flex items-center justify-between bg-[#3B1818] p-3 rounded-md">
            <span>Require Approval</span>
            <input
              type="checkbox"
              checked={requireApproval}
              onChange={() => setRequireApproval(!requireApproval)}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Create Event Button */}
        <button
          onClick={handleCreateEvent}
          className="w-full bg-white text-black font-bold py-3 rounded-md mt-4"
        >
          Create Event
        </button>

        {/* Leaflet Map */}
        <div id="map" className="w-full h-96 mt-6 rounded-lg"></div>
      </div>
    </div>
  );
}
