import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    //console.log(form)
    // UI validation
    if (!form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      //console.log(email, password)

      const response = await registerUser({
  email: form.email,
  password: form.password,
});

        console.log(response.data.data.id, response.data.data.email)

    

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1000);

    } catch (err) {
  console.log("Full backend error:", err.response?.data, err.response.data.message);

  const backendError = err.response?.data;

  if (backendError?.err && backendError.err.length > 0) {
    console.log("Validation error:", backendError.err[0]);
    setError(backendError.err[0]);
  } else {
    setError(
      backendError?.message || "Registration failed. Try again."
    );
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account ✈️
          </h1>
          <p className="text-gray-500 mt-1">
            Join our Airline Booking Platform
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
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
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
