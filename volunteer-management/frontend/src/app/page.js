export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Volunteer Management System</h1>
      <p className="mt-2 text-lg">Organize events and manage volunteers easily.</p>
      <a href="/auth/login" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Get Started</a>
    </div>
  );
}
