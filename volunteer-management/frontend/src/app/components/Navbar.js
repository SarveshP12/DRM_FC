export default function Navbar() {
    return (
      <nav className="w-full p-4 bg-gray-800 text-white flex justify-between">
        <a href="/" className="text-xl font-bold">Volunteer App</a>
        <div>
          <a href="/dashboard" className="mr-4">Dashboard</a>
          <a href="/auth/login">Login</a>
        </div>
      </nav>
    );
  }
  