import { useEffect, useState } from "react";
import { getCities } from "../api/cityApi";
import { getAirports } from "../api/airportApi";
import { getAllFlights, searchFlights } from "../api/flightApi";

export default function SearchFlights() {
  // 🌆 Cities
  const [cities, setCities] = useState([]);

  // 🛫 Airports
  const [sourceAirports, setSourceAirports] = useState([]);
  const [destAirports, setDestAirports] = useState([]);

  // 🔍 Search form
  const [form, setForm] = useState({
    sourceCityId: "",
    destinationCityId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    date: ""
  });

  // ✈️ Flights
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 LOAD DATA ON PAGE LOAD
  useEffect(() => {
    loadInitialData();
  }, []);

  // 1️⃣ Load cities + ALL flights by default
  const loadInitialData = async () => {
    try {
      const cityRes = await getCities();
      setCities(cityRes.data.data);

      const flightRes = await getAllFlights();
      setFlights(flightRes.data.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  // 2️⃣ Handle source city change
  const handleSourceCityChange = async (cityId) => {
    setForm({
      ...form,
      sourceCityId: cityId,
      departureAirportId: ""
    });

    if (!cityId) return;

    const res = await getAirports(cityId);
    setSourceAirports(res.data.data);
  };

  // 3️⃣ Handle destination city change
  const handleDestCityChange = async (cityId) => {
    setForm({
      ...form,
      destinationCityId: cityId,
      arrivalAirportId: ""
    });

    if (!cityId) return;

    const res = await getAirports(cityId);
    setDestAirports(res.data.data);
  };

  // 4️⃣ Search flights (FILTER)
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await searchFlights({
        departureAirportId: form.departureAirportId,
        arrivalAirportId: form.arrivalAirportId,
        date: form.date
      });
      setFlights(res.data.data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Search Flights ✈️
      </h1>

      {/* 🔍 SEARCH SECTION */}
      <form
        onSubmit={handleSearch}
        className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-6 gap-4"
      >
        {/* FROM CITY */}
        <select
          className="border p-2 rounded"
          value={form.sourceCityId}
          onChange={(e) => handleSourceCityChange(e.target.value)}
        >
          <option value="">From City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* FROM AIRPORT */}
        <select
          disabled={!form.sourceCityId}
          className="border p-2 rounded disabled:bg-gray-100"
          value={form.departureAirportId}
          onChange={(e) =>
            setForm({ ...form, departureAirportId: e.target.value })
          }
        >
          <option value="">From Airport</option>
          {sourceAirports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* TO CITY */}
        <select
          className="border p-2 rounded"
          value={form.destinationCityId}
          onChange={(e) => handleDestCityChange(e.target.value)}
        >
          <option value="">To City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* TO AIRPORT */}
        <select
          disabled={!form.destinationCityId}
          className="border p-2 rounded disabled:bg-gray-100"
          value={form.arrivalAirportId}
          onChange={(e) =>
            setForm({ ...form, arrivalAirportId: e.target.value })
          }
        >
          <option value="">To Airport</option>
          {destAirports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* ✈️ FLIGHTS LIST */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          {form.departureAirportId && form.arrivalAirportId
            ? "Filtered Flights"
            : "All Available Flights"}
        </h2>

        {loading && <p>Loading flights...</p>}

        {!loading && flights.length === 0 && (
          <p className="text-gray-500">No flights found</p>
        )}

        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">
                Flight {flight.flightNumber}
              </p>
              <p className="text-sm text-gray-600">
                Departure:{" "}
                {new Date(flight.departureTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Arrival:{" "}
                {new Date(flight.arrivalTime).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">
                ₹{flight.price}
              </p>
              <p className="text-sm text-gray-500">
                Seats: {flight.totalSeats}
              </p>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
