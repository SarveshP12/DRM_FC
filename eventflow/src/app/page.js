import Navbar from "./components/navbar";
import HomePage from "./components/home"; // Renaming import to avoid conflict

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <HomePage /> {/* Use the new name */}
    </div>
  );
}
