"use client";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function BroadcastMessages() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("broadcast", message);
    setMessage("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Broadcast Messages</h2>
      <input type="text" placeholder="Type message" className="border p-2 m-2" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
    </div>
  );
}
