import { useEffect, useState } from "react";
import { getCities } from "../../api/cityApi";
import { getAirports } from "../../api/airportApi";
import { getAllFlights } from "../../api/flightApi";

export default function SearchFlights() {
  const [cities, setCities] = useState([]);
  const [airports, setAirports] = useState([]);
  const [cityMap, setCityMap] = useState({});
  const [flights, setFlights] = useState([]);

  const [filters, setFilters] = useState({
    fromCityId: "",
    toCityId: "",
    date: "",
    passengers: 1,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // 1️⃣ Fetch Cities
      const cityRes = await getCities();
      const citiesData = cityRes.data.data;
      setCities(citiesData);

      // cityId → cityName
      const cityLookup = {};
      citiesData.forEach((c) => {
        cityLookup[c.id] = c.name;
      });

      // 2️⃣ Fetch Airports
      const airportRes = await getAirports();
      const airportsData = airportRes.data.data;
      setAirports(airportsData);

      // airportId → cityName
      const airportCityMap = {};
      airportsData.forEach((a) => {
        airportCityMap[a.id] = cityLookup[a.cityId];
      });
      setCityMap(airportCityMap);

      // 3️⃣ Fetch Flights
      const flightRes = await getAllFlights();
      setFlights(flightRes.data.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">

      {/* SEARCH BAR */}
      <div className="bg-white shadow-lg rounded-b-3xl px-6 py-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">

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

          <input
            type="date"
            className="border rounded-full px-4 py-3"
            value={filters.date}
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value })
            }
          />

          <input
            type="number"
            min="1"
            className="border rounded-full px-4 py-3"
            value={filters.passengers}
            onChange={(e) =>
              setFilters({ ...filters, passengers: Number(e.target.value) })
            }
          />

          <button className="bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>

      {/* FLIGHT LIST */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-4">
        {flights.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">
                Flight {f.flightNumber}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(f.departureTime).toLocaleTimeString()} →
                {new Date(f.arrivalTime).toLocaleTimeString()}
              </p>

              {/* ✅ CITY NAMES */}
              <p className="text-sm font-medium text-gray-700">
                {cityMap[f.departureAirportId]} →{" "}
                {cityMap[f.arrivalAirportId]}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">₹{f.price}</p>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
