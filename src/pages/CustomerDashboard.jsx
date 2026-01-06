import { useEffect, useState } from "react";
import SearchFlights from "../pages/SearchFlights";
import { getAllFlights } from "../api/flightApi";
import { getAirports } from "../api/airportApi";

export default function CustomerFlights() {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // ✅ NEW

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const flightRes = await getAllFlights();
    const airportRes = await getAirports();

    setFlights(flightRes.data.data);
    setAirports(airportRes.data.data);
  };

  // 🔍 SEARCH HANDLER
  const handleSearch = async (filters) => {
  setHasSearched(true);

  const fromCityId = Number(filters.fromCityId);
  const toCityId = Number(filters.toCityId);

  const fromAirports = airports
    .filter(a => a.cityId === fromCityId)
    .map(a => a.id);

  const toAirports = airports
    .filter(a => a.cityId === toCityId)
    .map(a => a.id);

  const params = {};

  if (fromAirports.length > 0) {
    params.departureAirportId = fromAirports.join(","); // ✅ FIX
  }

  if (toAirports.length > 0) {
    params.arrivalAirportId = toAirports.join(","); // ✅ FIX
  }

  if (filters.date) {
    params.date = filters.date;
  }

  if (filters.passengers) {
    params.minSeats = filters.passengers;
  }

  const res = await getAllFlights(params);
  console.log(res)
  setFlights(res.data.data);
};


  const getAirportName = (id) =>
    airports.find(a => a.id === id)?.name || "Unknown Airport";

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* SEARCH BAR */}
      <SearchFlights onSearch={handleSearch} />

      {/* SEARCH HEADER */}
      {hasSearched && (
        <h2 className="text-xl font-semibold mt-6 text-gray-700">
          Search Results
        </h2>
      )}

      {/* RESULTS */}
      {hasSearched&&flights.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
    No flights available for the selected route and date
  </p>
      ) : (
        <div className="space-y-5 mt-4">
          {flights.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col md:flex-row md:justify-between md:items-center"
            >
              {/* LEFT */}
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  ✈️ Flight {f.flightNumber}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {getAirportName(f.departureAirportId)} →
                  {getAirportName(f.arrivalAirportId)}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(f.departureTime).toLocaleString()} →
                  {new Date(f.arrivalTime).toLocaleString()}
                </p>
              </div>

              {/* RIGHT */}
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-2xl font-bold text-blue-600">
                  ₹{f.price}
                </p>

                <button className="mt-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
