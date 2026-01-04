export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome ✈️
        </h1>

        <p className="text-gray-600 mb-6">
          Search flights, book tickets, and manage your journey easily.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            🔍 Search Flights
          </button>

          <button className="bg-blue-100 text-blue-700 py-3 rounded hover:bg-blue-200">
            📄 My Bookings
          </button>

          <button className="bg-blue-100 text-blue-700 py-3 rounded hover:bg-blue-200">
            👤 My Profile
          </button>
        </div>
      </div>
    </div>
  );
}
