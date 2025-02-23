"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "volunteer" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", formData);
      localStorage.setItem("token", res.data.token); // Save token
      router.push("/dashboard"); // Redirect after signup
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" name="name" placeholder="Name" className="input mb-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="input mb-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="input mb-2" onChange={handleChange} required />
        
        {/* Role selection */}
        <select name="role" className="input mb-2" onChange={handleChange} required>
          <option value="volunteer">Volunteer</option>
          <option value="event_manager">Event Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
