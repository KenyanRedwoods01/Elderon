export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-400">Welcome to the ElderonAI Admin Panel</p>
      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-sm text-gray-400">Total Users</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-sm text-gray-400">Organizations</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-sm text-gray-400">Projects</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-sm text-gray-400">System Health</h3>
          <p className="text-2xl font-bold mt-2 text-green-500">Healthy</p>
        </div>
      </div>
    </div>
  );
}
