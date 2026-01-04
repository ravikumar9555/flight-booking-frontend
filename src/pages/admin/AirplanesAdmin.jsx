import { useEffect, useState } from "react";
import { getAirplanes } from "../../api/airplaneApi";

export default function AirplanesAdmin() {
  const [airplanes, setAirplanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchAirplanes();
  }, []);

  const fetchAirplanes = async () => {
    try {
      const response = await getAirplanes();
      setAirplanes(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load airplanes");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Pagination logic
  const totalPages = Math.ceil(airplanes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAirplanes = airplanes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return <p className="text-gray-500">Loading airplanes...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold mb-6">
        ✈️ Airplanes
      </h2>

      {airplanes.length === 0 ? (
        <p className="text-gray-500">No airplanes found</p>
      ) : (
        <>
          {/* AIRPLANE CARDS (ONE DOWN ONE) */}
          <div className="space-y-4">
            {currentAirplanes.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {a.modelNumber}
                  </h3>
                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    ID #{a.id}
                  </span>
                </div>

                {/* BODY */}
                <p className="text-gray-600">
                  <span className="font-medium">Capacity:</span>{" "}
                  {a.capacity} seats
                </p>

                {/* FOOTER */}
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
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
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
