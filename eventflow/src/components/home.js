import React from "react";
import Navbar from "./navbar";
import backgroundImage from "../assets/image.png"; // Add your image in 'src/assets'

const Home = () => {
  return (
    <div className="relative h-screen w-full">
      <Navbar />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-6xl font-bold">
          <span className="text-orange-500">EVENT</span> MANAGEMENT
        </h1>
        <p className="mt-4 text-lg">
          You see, madness is a lot like gravity. All it takes is a little... Push
        </p>
      </div>
    </div>
  );
};

export default Home;
