import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("quorion_token")));

  useEffect(() => {
    const token = localStorage.getItem("quorion_token");
    if (!token) return;

    api("/api/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem("quorion_token"))
      .finally(() => setLoading(false));
  }, []);

  async function login(payload) {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    localStorage.setItem("quorion_token", data.token);
    setUser(data.user);
    return data.user;
  }

  async function signup(payload) {
    const data = await api("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    localStorage.setItem("quorion_token", data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("quorion_token");
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
