import React from "react";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div 
      className="w-full min-h-screen overflow-auto"
      style={{
        backgroundImage: "linear-gradient(to bottom, #541f3b 10%, #d78a42 90%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Navbar />
      
      {/* Scrollable Content */}
      <div className="relative flex flex-col justify-center items-center text-white text-center px-4 pt-20">
        <h1 className="text-6xl font-bold tracking-wide drop-shadow-lg">
          <span className="text-[#e8b878]">EVENT</span> MANAGEMENT
        </h1>

        {/* Search Bar */}
        <div className="mt-8 w-full max-w-xl">
          <input 
            type="text" 
            placeholder="Search for events..." 
            className="w-full px-6 py-3 text-white placeholder-gray-300 rounded-full border-2 border-[#A0B4E5] shadow-md bg-transparent focus:outline-none focus:border-[#e8b878]"
          />
        </div>


        {/* Create Event Button */}
        <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-[#ffde4d] rounded-full shadow-md hover:bg-[#ffd700] hover:text-black transition-all">
          Create Event
        </button>

        {/* Dummy Content to Enable Scrolling */}
        <div className="mt-20 h-[200vh] flex items-center justify-center">
          <p className="text-xl opacity-80">Scroll Down to See Effect</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
