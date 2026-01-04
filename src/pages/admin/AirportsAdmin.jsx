import { useEffect, useState } from "react";
import { getAirports } from "../../api/airportApi";
import { getCities } from "../../api/cityApi";

export default function AirportsAdmin() {
  const [airports, setAirports] = useState([]);
  const [citiesMap, setCitiesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [airportRes, cityRes] = await Promise.all([
        getAirports(),
        getCities(),
      ]);

      setAirports(airportRes.data.data);

      // 🔥 Convert cities array → map { id: name }
      const cityLookup = {};
      cityRes.data.data.forEach((c) => {
        cityLookup[c.id] = c.name;
      });
      setCitiesMap(cityLookup);
    } catch (err) {
      console.error(err);
      setError("Failed to load airports");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(airports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAirports = airports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <p className="text-gray-500">Loading airports...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold mb-6">🏢 Airports</h2>

      {airports.length === 0 ? (
        <p className="text-gray-500">No airports found</p>
      ) : (
        <>
          {/* AIRPORT CARDS */}
          <div className="space-y-4">
            {currentAirports.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {a.name}
                  </h3>
                  <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    ID #{a.id}
                  </span>
                </div>

                <p className="text-gray-600">
                  <span className="font-medium">City:</span>{" "}
                  {citiesMap[a.cityId] || "Unknown"}
                </p>
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
