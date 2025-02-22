"use client";
import { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Events from "./components/events";
import CreateEvent from "./components/create-event";

export default function Page() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen">
      <Navbar setActivePage={setActivePage} />
      
      {activePage === "home" && <Home />}
      {activePage === "events" && <Events />}
      {activePage === "calendar" && <Calendar />}
      {activePage === "create-event" && <CreateEvent />}
    </div>
  );
}
