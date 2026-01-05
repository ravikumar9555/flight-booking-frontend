import { useEffect, useState } from "react";
import { getAllFlights, createFlight } from "../../api/flightApi";
import { getAirplanes } from "../../api/airplaneApi";
import { getAirports } from "../../api/airportApi";
import { getCities } from "../../api/cityApi";

export default function FlightsAdmin() {
  const [flights, setFlights] = useState([]);
  const [airplanes, setAirplanes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [form, setForm] = useState({
    flightNumber: "",
    airplaneId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureTime: "",
    arrivalTime: "",
    price: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [flightRes, airplaneRes, airportRes, cityRes] =
        await Promise.all([
          getAllFlights(),
          getAirplanes(),
          getAirports(),
          getCities()
        ]);

      setFlights(flightRes.data.data);
      setAirplanes(airplaneRes.data.data);
      setAirports(airportRes.data.data);
      setCities(cityRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Maps
  const cityMap = Object.fromEntries(cities.map(c => [c.id, c.name]));
  const airportMap = Object.fromEntries(
    airports.map(a => [
      a.id,
      `${a.name} (${cityMap[a.cityId] || "Unknown"})`
    ])
  );
  const airplaneMap = Object.fromEntries(
    airplanes.map(a => [a.id, a])
  );

  // 🔹 Pagination logic
  const totalPages = Math.ceil(flights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFlights = flights.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔹 Create Flight
  const handleCreateFlight = async () => {
    try {
      const airplane = airplaneMap[form.airplaneId];
      if (!airplane) return alert("Select airplane");

      await createFlight({
        flightNumber: form.flightNumber,
        airplaneId: Number(form.airplaneId),
        departureAirportId: Number(form.departureAirportId),
        arrivalAirportId: Number(form.arrivalAirportId),
        departureTime: form.departureTime,
        arrivalTime: form.arrivalTime,
        price: Number(form.price),
        totalSeats: airplane.capacity // 🔥 AUTO
      });

      alert("Flight created");
      setForm({
        flightNumber: "",
        airplaneId: "",
        departureAirportId: "",
        arrivalAirportId: "",
        departureTime: "",
        arrivalTime: "",
        price: ""
      });

      loadData();
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert("Failed to create flight");
    }
  };

  if (loading) return <p>Loading flights...</p>;

  return (
    <div className="space-y-10">

      {/* ADD FLIGHT */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">➕ Add Flight</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Flight Number"
            className="border p-2 rounded"
            value={form.flightNumber}
            onChange={(e) =>
              setForm({ ...form, flightNumber: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.airplaneId}
            onChange={(e) =>
              setForm({ ...form, airplaneId: e.target.value })
            }
          >
            <option value="">Select Airplane</option>
            {airplanes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.modelNumber} ({a.capacity} seats)
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={form.departureAirportId}
            onChange={(e) =>
              setForm({ ...form, departureAirportId: e.target.value })
            }
          >
            <option value="">Departure Airport</option>
            {airports.map((a) => (
              <option key={a.id} value={a.id}>
                {airportMap[a.id]}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={form.arrivalAirportId}
            onChange={(e) =>
              setForm({ ...form, arrivalAirportId: e.target.value })
            }
          >
            <option value="">Arrival Airport</option>
            {airports.map((a) => (
              <option key={a.id} value={a.id}>
                {airportMap[a.id]}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={form.departureTime}
            onChange={(e) =>
              setForm({ ...form, departureTime: e.target.value })
            }
          />

          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={form.arrivalTime}
            onChange={(e) =>
              setForm({ ...form, arrivalTime: e.target.value })
            }
          />

          <input
            placeholder="Price"
            className="border p-2 rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <button
            onClick={handleCreateFlight}
            className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Flight
          </button>
        </div>
      </div>

      {/* FLIGHT LIST */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">✈️ Flights</h2>

        <div className="space-y-4">
          {paginatedFlights.map((f) => (
            <div
              key={f.id}
              className="border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{f.flightNumber}</p>
                <p className="text-sm text-gray-500">
                  {new Date(f.departureTime).toLocaleString()} →
                  {new Date(f.arrivalTime).toLocaleString()}
                </p>
                <p className="text-sm">
                  {airportMap[f.departureAirportId]} →{" "}
                  {airportMap[f.arrivalAirportId]}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">₹{f.price}</p>
                <p className="text-sm text-gray-500">
                  Seats: {f.totalSeats}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
