import { useState } from "react";

export default function AdminDashboard() {
  const [form, setForm] = useState({
    airline: "",
    source: "",
    destination: "",
    departureTime: "",
    price: "",
  });

  const [flights] = useState([
    {
      _id: "1",
      airline: "IndiGo",
      source: "Delhi",
      destination: "Mumbai",
      departureTime: "2026-01-05 10:30",
      price: 4500,
    },
    {
      _id: "2",
      airline: "Air India",
      source: "Bangalore",
      destination: "Chennai",
      departureTime: "2026-01-06 14:00",
      price: 3200,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard ✈️
      </h1>

      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Add New Flight (Dummy)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Airline"
            value={form.airline}
            onChange={(e) =>
              setForm({ ...form, airline: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            placeholder="Source"
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            placeholder="Destination"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <button
            type="button"
            className="md:col-span-3 bg-blue-600 text-white py-2 rounded cursor-not-allowed"
          >
            Add Flight
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Flights List
        </h2>

        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Airline</th>
              <th className="p-3 text-left">Route</th>
              <th className="p-3 text-left">Departure</th>
              <th className="p-3 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={f._id} className="border-t">
                <td className="p-3">{f.airline}</td>
                <td className="p-3">
                  {f.source} → {f.destination}
                </td>
                <td className="p-3">{f.departureTime}</td>
                <td className="p-3 font-semibold">
                  ₹{f.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
