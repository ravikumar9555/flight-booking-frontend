
import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* LEFT SIDE: LOGO / NAME */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ✈️ AirLine Booking
      </Link>

      {/* RIGHT SIDE: AUTH BUTTONS */}
      <div className="space-x-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            to="/admin"
            className="text-gray-600 hover:text-blue-600"
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}
