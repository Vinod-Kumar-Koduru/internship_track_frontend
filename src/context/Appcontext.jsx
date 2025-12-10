/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { request } from "../api/api";

// 1. Create the Context HERE
export const AppContext = createContext();

// 2. Export the Provider from the same file
export const AppProvider = ({ children }) => {
  // Lazy initialize to read localStorage only once
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    try {
      const item = localStorage.getItem("user");
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  });

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    let mounted = true;

    async function fetchProfile() {
      if (!user) setLoading(true);
      try {
        const res = await request("/auth/profile", { token });
        if (mounted) setUser(res.user);
      } catch (err) {
        console.warn("Session expired:", err);
        setToken(null);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [token]);

  const authHeader = useCallback(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  const value = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      applications,
      setApplications,
      loading,
      setLoading,
      authHeader,
    }),
    [token, user, applications, loading, authHeader]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
