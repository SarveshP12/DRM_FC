import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Ensure correct import
import { Users, AlertTriangle } from "lucide-react";

export default function EventCard({ event }) {
  if (!event) {
    event = {
      name: "Sample Event",
      time: "10:00 AM, 25th Feb",
      location: "Central Park",
      guests: 20,
      image: "/default-image.png",
    };
  }

  return (
    <Card className="w-full bg-gray-900 text-gray-100 p-4 rounded-lg shadow-lg border border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <p className="text-sm text-gray-400">{event.time || "Time Not Set"}</p>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
          <span className="text-gray-100">{event.location || "Location Not Set"}</span>
        </div>

        {!event.location && (
          <div className="flex items-center space-x-2 text-yellow-400 text-sm">
            <AlertTriangle size={16} />
            <span>Location Missing</span>
          </div>
        )}

        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Users size={16} />
          <span>{event.guests ? `${event.guests} guests` : "No guests"}</span>
        </div>

        <div className="flex space-x-3 mt-2">
          <button className="bg-white text-black px-3 py-1.5 rounded-lg text-sm font-medium">
            Check In
          </button>
          <button className="bg-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1">
            <span>Manage</span>
            <span>→</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
