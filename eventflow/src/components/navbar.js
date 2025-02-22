import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold">Event Management</div>
      <ul className="flex gap-6">
        <li className="cursor-pointer hover:text-orange-500">Home</li>
        <li className="cursor-pointer hover:text-orange-500">About</li>
        <li className="cursor-pointer hover:text-orange-500">Events</li>
        <li className="cursor-pointer hover:text-orange-500">Services</li>
        <li className="cursor-pointer hover:text-orange-500">Clients</li>
        <li className="cursor-pointer hover:text-orange-500">Gallery</li>
        <li className="cursor-pointer hover:text-orange-500">Blog</li>
        <li className="cursor-pointer hover:text-orange-500">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
