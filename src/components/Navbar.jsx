import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, email, logout } = useAuth();

  // Remove @gmail.com (safe)
  const displayName = email ? email.replace("@gmail.com", "") : "";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ✈️ AirLine Booking
      </Link>

      {/* AUTH ACTIONS */}
      <div className="flex items-center space-x-4">
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
          <>
            {/* 👤 EMAIL */}
            <span className="text-gray-700 font-medium">
              👤 {displayName}
            </span>

            {/* 🚪 LOGOUT */}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
