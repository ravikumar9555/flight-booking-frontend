import { useEffect, useState } from "react";
import {
  getAirports,
  createAirport,
  deleteAirport,
  updateAirport,
} from "../../api/airportApi";
import { getCities, createCity } from "../../api/cityApi";

export default function AirportsAdmin() {
  const [airports, setAirports] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesMap, setCitiesMap] = useState({});
  const [loading, setLoading] = useState(true);

  // ➕ Add City
  const [newCity, setNewCity] = useState("");

  // ➕ Add Airport
  const [airportForm, setAirportForm] = useState({
    name: "",
    cityId: "",
  });

  // ✏️ Edit Airport
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    cityId: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [airportRes, cityRes] = await Promise.all([
      getAirports(),
      getCities(),
    ]);

    setAirports(airportRes.data.data);
    setCities(cityRes.data.data);

    const map = {};
    cityRes.data.data.forEach((c) => (map[c.id] = c.name));
    setCitiesMap(map);

    setLoading(false);
  };

  // ➕ ADD CITY (auto-select later)
  const handleAddCity = async () => {
    if (!newCity.trim()) return alert("City name required");

    const res = await createCity({ name: newCity });

    // ✅ Auto-select newly added city
    setAirportForm({
      ...airportForm,
      cityId: res.data.data.id,
    });

    setNewCity("");
    fetchData();
  };

  // ➕ ADD AIRPORT
  const handleAddAirport = async () => {
    if (!airportForm.name || !airportForm.cityId) {
      return alert("Airport name & city required");
    }

    await createAirport({
      name: airportForm.name,
      cityId: Number(airportForm.cityId),
    });

    setAirportForm({ name: "", cityId: "" });
    fetchData();
  };

  // ❌ DELETE AIRPORT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this airport?")) return;
    await deleteAirport(id);
    fetchData();
  };

  // ✏️ START EDIT
  const startEdit = (airport) => {
    setEditingId(airport.id);
    setEditForm({
      name: airport.name,
      cityId: airport.cityId,
    });
  };

  // 💾 SAVE EDIT
  const saveEdit = async (id) => {
    if (!editForm.name || !editForm.cityId) {
      return alert("All fields required");
    }

    await updateAirport(id, {
      name: editForm.name,
      cityId: Number(editForm.cityId),
    });

    setEditingId(null);
    fetchData();
  };

  // Pagination
  const totalPages = Math.ceil(airports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAirports = airports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">

      {/* ➕ ADD CITY */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">➕ Add City</h2>
        <div className="flex gap-4">
          <input
            className="border p-2 rounded w-full"
            placeholder="City name"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
          <button
            onClick={handleAddCity}
            className="bg-blue-600 text-white px-5 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* ➕ ADD AIRPORT */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">➕ Add Airport</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Airport name"
            value={airportForm.name}
            onChange={(e) =>
              setAirportForm({ ...airportForm, name: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={airportForm.cityId}
            onChange={(e) =>
              setAirportForm({ ...airportForm, cityId: e.target.value })
            }
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddAirport}
            className="bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Airport
          </button>
        </div>
      </div>

      {/* 🏢 AIRPORT LIST */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">🏢 Airports</h2>

        <div className="space-y-4">
          {currentAirports.map((a) => (
            <div
              key={a.id}
              className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center"
            >
              {editingId === a.id ? (
                <div className="flex gap-3 w-full">
                  <input
                    className="border p-2 rounded flex-1"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />

                  <select
                    className="border p-2 rounded"
                    value={editForm.cityId}
                    onChange={(e) =>
                      setEditForm({ ...editForm, cityId: e.target.value })
                    }
                  >
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => saveEdit(a.id)}
                    className="bg-green-600 text-white px-3 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold text-lg">{a.name}</h3>
                    <p className="text-gray-600">
                      City: {citiesMap[a.cityId]}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(a)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Prev
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
