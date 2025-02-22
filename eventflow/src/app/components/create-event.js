"use client";
import React, { useState } from "react";
import Navbar from "./navbar";

const CreateEvent = () => {
  const router = useRouter();
  const createEvent = useMutation(api.events.create);
  
  const [eventData, setEventData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    isFullDay: false,
    location: "",
    capacity: 100,
    inviteLink: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(eventData);
      alert("Event Created Successfully!");
      router.push("/events"); // Redirect to events page after creation
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-[#3b1e1e] text-white rounded-lg shadow-md mt-20">
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Event Name" value={eventData.title} onChange={handleChange} required />
          
          <div className="flex gap-4">
            <Input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} required />
            <Input type="time" name="startTime" value={eventData.startTime} onChange={handleChange} required />
          </div>

          <div className="flex gap-4">
            <Input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} />
            <Input type="time" name="endTime" value={eventData.endTime} onChange={handleChange} />
          </div>

          <div className="flex items-center gap-2">
            <label>Full Day Event</label>
            <Switch 
              name="isFullDay"
              checked={eventData.isFullDay}
              onCheckedChange={() => setEventData({...eventData, isFullDay: !eventData.isFullDay })}
            />
          </div>

          <Input name="location" placeholder="Event Location" value={eventData.location} onChange={handleChange} required />
          <Textarea name="description" placeholder="Event Description" value={eventData.description} onChange={handleChange} />
          <Input type="number" name="capacity" value={eventData.capacity} onChange={handleChange} />

          <Button type="submit" className="w-full bg-white text-black">Create Event</Button>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
