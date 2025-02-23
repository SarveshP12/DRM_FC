export default function Dashboard() {
    return (
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <a href="/dashboard/event" className="p-4 bg-gray-200 rounded">Manage Events</a>
          <a href="/dashboard/volunteers" className="p-4 bg-gray-200 rounded">Manage Volunteers</a>
          <a href="/dashboard/messages" className="p-4 bg-gray-200 rounded">Broadcast Messages</a>
        </div>
      </div>
    );
  }
  