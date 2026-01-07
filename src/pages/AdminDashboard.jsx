import { useState } from "react";
import FlightsAdmin from "./admin/FlightsAdmin";
import UsersAdmin from "./admin/UsersAdmin";
import AirplanesAdmin from "./admin/AirplanesAdmin";
import AirportsAdmin from "./admin/AirportsAdmin";
import SearchFlights from "./SearchFlights";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("flights");
  const [searchFilters, setSearchFilters] = useState({}); // 🔥 NEW

  const tabs = [
    { key: "flights", label: "Flights", icon: "✈️" },
    { key: "users", label: "Users", icon: "👤" },
    { key: "airplanes", label: "Airplanes", icon: "🛩️" },
    { key: "airports", label: "Airports", icon: "🏢" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
                ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* 🔍 SHOW SEARCH ONLY FOR FLIGHTS */}
        {activeTab === "flights" && (
          <SearchFlights onSearch={setSearchFilters} />
        )}

        <h1 className="text-3xl font-bold mb-6">
          {tabs.find(t => t.key === activeTab)?.label}
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          {activeTab === "flights" && (
            <FlightsAdmin searchFilters={searchFilters} />
          )}
          {activeTab === "users" && <UsersAdmin />}
          {activeTab === "airplanes" && <AirplanesAdmin />}
          {activeTab === "airports" && <AirportsAdmin />}
        </div>

      </main>
    </div>
  );
}
