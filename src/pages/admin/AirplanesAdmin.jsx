import { useEffect, useState } from "react";
import {
  getAirplanes,
  createAirplane,
  deleteAirplane,
} from "../../api/airplaneApi";

export default function AirplanesAdmin() {
  const [airplanes, setAirplanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ➕ Add airplane form
  const [form, setForm] = useState({
    modelNumber: "",
    capacity: "",
  });

  const [formError, setFormError] = useState("");

  // 📄 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchAirplanes();
  }, []);

  const fetchAirplanes = async () => {
    try {
      const res = await getAirplanes();
      setAirplanes(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load airplanes");
    } finally {
      setLoading(false);
    }
  };

  // ➕ ADD AIRPLANE
  const handleAddAirplane = async () => {
    const capacity = Number(form.capacity);

    if (!form.modelNumber) {
      setFormError("Model number is required");
      return;
    }

    if (!capacity || capacity <= 0) {
      setFormError("Capacity must be greater than 0");
      return;
    }

    try {
      setFormError("");

      await createAirplane({
        modelNumber: form.modelNumber,
        capacity,
      });

      setForm({ modelNumber: "", capacity: "" });
      fetchAirplanes();
    } catch (err) {
      console.error(err);
      setFormError("Failed to add airplane");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this airplane?")) return;

    try {
      await deleteAirplane(id);
      fetchAirplanes();
    } catch (err) {
      console.error(err);
      alert("Cannot delete airplane (used in flights)");
    }
  };

  // 📄 Pagination logic
  const totalPages = Math.ceil(airplanes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAirplanes = airplanes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <p>Loading airplanes...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-8">

      {/* ➕ ADD AIRPLANE */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">➕ Add Airplane</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Model Number (A320)"
            value={form.modelNumber}
            onChange={(e) =>
              setForm({ ...form, modelNumber: e.target.value })
            }
          />

          <input
            type="number"
            min={1}               // ✅ BLOCK NEGATIVE
            className="border p-2 rounded"
            placeholder="Capacity"
            value={form.capacity}
            onChange={(e) =>
              setForm({ ...form, capacity: e.target.value })
            }
          />

          <button
            onClick={handleAddAirplane}
            disabled={!form.modelNumber || Number(form.capacity) <= 0}
            className={`rounded text-white ${
              !form.modelNumber || Number(form.capacity) <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Add Airplane
          </button>
        </div>

        {formError && (
          <p className="text-red-600 mt-3 text-sm">{formError}</p>
        )}
      </div>

      {/* ✈️ AIRPLANES LIST */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">✈️ Airplanes</h2>

        {currentAirplanes.length === 0 ? (
          <p className="text-gray-500">No airplanes found</p>
        ) : (
          <div className="space-y-4">
            {currentAirplanes.map((a) => (
              <div
                key={a.id}
                className="border rounded-xl p-4 flex justify-between items-center hover:shadow transition"
              >
                <div>
                  <p className="font-semibold text-lg">{a.modelNumber}</p>
                  <p className="text-sm text-gray-500">
                    Capacity: {a.capacity} seats
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    ID #{a.id}
                  </span>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
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
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
