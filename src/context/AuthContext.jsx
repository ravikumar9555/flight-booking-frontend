import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null); // ✅ ADD EMAIL

  // 🔁 Rehydrate auth on refresh / revisit
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);

      // 🔥 Decode email from token
      const decoded = jwtDecode(storedToken);
      setEmail(decoded.email);
    }

    if (storedRole) setRole(storedRole);
  }, []);

  // 🔐 LOGIN
  const login = (newToken, userRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", userRole);

    const decoded = jwtDecode(newToken);

    setToken(newToken);
    setRole(userRole);
    setEmail(decoded.email); // ✅ SET EMAIL
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
