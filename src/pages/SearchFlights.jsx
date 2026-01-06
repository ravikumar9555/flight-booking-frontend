import { useEffect, useState } from "react";
import { getCities } from "../api/cityApi";

export default function SearchFlights({ onSearch }) {
  const [cities, setCities] = useState([]);

  const [filters, setFilters] = useState({
    fromCityId: "",
    toCityId: "",
    date: "",
    passengers: 1,
  });

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const res = await getCities();
      setCities(res.data.data);
    } catch (err) {
      console.error("Failed to load cities");
    }
  };

  // 🔥 BUILD BACKEND-COMPATIBLE FILTER
  const handleSearch = () => {
    const payload = {};

    if (filters.fromCityId) {
      payload.fromCityId = Number(filters.fromCityId);
    }

    if (filters.toCityId) {
      payload.toCityId = Number(filters.toCityId);
    }

    if (filters.date) {
      payload.date = filters.date;
    }

    if (filters.passengers) {
      payload.minSeats = Number(filters.passengers);
    }

    console.log("SEARCH PAYLOAD 👉", payload);

    onSearch(payload); // 🚀 send to parent
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* FROM CITY */}
        <select
          className="border rounded-full px-4 py-3"
          value={filters.fromCityId}
          onChange={(e) =>
            setFilters({ ...filters, fromCityId: e.target.value })
          }
        >
          <option value="">From City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* TO CITY */}
        <select
          className="border rounded-full px-4 py-3"
          value={filters.toCityId}
          onChange={(e) =>
            setFilters({ ...filters, toCityId: e.target.value })
          }
        >
          <option value="">To City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          className="border rounded-full px-4 py-3"
          value={filters.date}
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
        />

        {/* PASSENGERS */}
        <input
          type="number"
          min={1}
          className="border rounded-full px-4 py-3"
          value={filters.passengers}
          onChange={(e) =>
            setFilters({
              ...filters,
              passengers: Number(e.target.value),
            })
          }
        />

        {/* SEARCH */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}
