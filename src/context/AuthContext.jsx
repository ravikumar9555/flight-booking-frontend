import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null); // 🔥 ADD ROLE

  // 🔁 Rehydrate auth on refresh / revisit
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
  }, []);

  // 🔐 LOGIN
  const login = (newToken, userRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", userRole);

    setToken(newToken);
    setRole(userRole);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
