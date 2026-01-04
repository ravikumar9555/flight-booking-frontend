import { useEffect, useState } from "react";
import { getCities } from "../api/cityApi";
import { getAirports } from "../api/airportApi";
import { getAllFlights, searchFlights } from "../api/flightApi";

export default function SearchFlights() {
  const [cities, setCities] = useState([]);
  const [fromAirports, setFromAirports] = useState([]);
  const [toAirports, setToAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    fromCityId: "",
    toCityId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    date: "",
  });

  // 🔥 LOAD DEFAULT DATA
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const cityRes = await getCities();
      setCities(cityRes.data.data);

      const flightRes = await getAllFlights();
      setFlights(flightRes.data.data);
    } catch (err) {
      console.error("Failed to load initial data", err);
    }
  };

  // 🏙 FROM CITY CHANGE
  const handleFromCityChange = async (cityId) => {
    setFilters({
      ...filters,
      fromCityId: cityId,
      departureAirportId: "",
    });

    if (!cityId) return;
    const res = await getAirports(cityId);
    setFromAirports(res.data.data);
  };

  // 🏙 TO CITY CHANGE
  const handleToCityChange = async (cityId) => {
    setFilters({
      ...filters,
      toCityId: cityId,
      arrivalAirportId: "",
    });

    if (!cityId) return;
    const res = await getAirports(cityId);
    setToAirports(res.data.data);
  };

  // 🔍 SEARCH FLIGHTS
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchFlights({
        departureAirportId: filters.departureAirportId,
        arrivalAirportId: filters.arrivalAirportId,
        date: filters.date,
      });
      setFlights(res.data.data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-6">Search Flights</h1>

        {/* SEARCH BAR */}
        <div className="bg-white shadow rounded-xl p-4 flex flex-col lg:flex-row gap-4">

          {/* FROM CITY */}
          <select
            className="border rounded px-3 py-2"
            onChange={(e) => handleFromCityChange(e.target.value)}
          >
            <option value="">From City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* FROM AIRPORT */}
          <select
            className="border rounded px-3 py-2"
            onChange={(e) =>
              setFilters({ ...filters, departureAirportId: e.target.value })
            }
          >
            <option value="">From Airport</option>
            {fromAirports.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          {/* TO CITY */}
          <select
            className="border rounded px-3 py-2"
            onChange={(e) => handleToCityChange(e.target.value)}
          >
            <option value="">To City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* TO AIRPORT */}
          <select
            className="border rounded px-3 py-2"
            onChange={(e) =>
              setFilters({ ...filters, arrivalAirportId: e.target.value })
            }
          >
            <option value="">To Airport</option>
            {toAirports.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          {/* DATE */}
          <input
            type="date"
            className="border rounded px-3 py-2"
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value })
            }
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* RESULTS */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Available Flights
          </h2>

          {loading && <p>Loading flights...</p>}

          {!loading && flights.length === 0 && (
            <p className="text-gray-500">No flights found</p>
          )}

          <div className="space-y-4">
            {flights.map((f) => (
              <div
                key={f.id}
                className="bg-white border rounded-xl p-5 flex justify-between items-center hover:shadow"
              >
                <div>
                  <p className="font-semibold text-lg">
                    Flight {f.flightNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(f.departureTime).toLocaleString()} →
                    {new Date(f.arrivalTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Seats: {f.totalSeats}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold">₹{f.price}</p>
                  <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
