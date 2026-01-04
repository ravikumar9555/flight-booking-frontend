import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, checkIsAdmin } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    setError("Email and password are required");
    return;
  }

  setLoading(true);
  setError("");

  try {
    // 1️⃣ LOGIN API
    const response = await loginUser({
      email: form.email,
      password: form.password,
    });

    if (!response?.data?.success) {
      setError(response?.data?.message || "Login failed");
      return;
    }

    // 2️⃣ TOKEN
    const token = response.data.data;

    // 3️⃣ DECODE JWT → GET USER ID
    const decoded = jwtDecode(token);
    console.log("DECODED JWT 👉", decoded);

    // 4️⃣ FETCH ROLE FROM BACKEND
    const roleRes = await checkIsAdmin(decoded.id);
    const role = roleRes.data.data; // "ADMIN" or "CUSTOMER"

    console.log("ROLE 👉", role);

    // 🔥 5️⃣ SAVE TOKEN + ROLE TO CONTEXT
    login(token, role);

    // 6️⃣ REDIRECT BASED ON ROLE
    if (role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/customer", { replace: true });
    }
  } catch (err) {
    console.error("LOGIN ERROR 👉", err);
    setError("Something went wrong during login");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back ✈️
          </h1>
          <p className="text-gray-500 mt-1">
            Sign in to your Airline Booking account
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
