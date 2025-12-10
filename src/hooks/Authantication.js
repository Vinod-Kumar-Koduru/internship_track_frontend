import { useContext, useCallback } from "react";
import { AppContext } from "../context/Appcontext";
import { request } from "../api/api";
import { toast } from "react-toastify";

export default function useAuthentication() {
  const { token, setToken, user, setUser, setApplications } =
    useContext(AppContext);

  const login = useCallback(
    async (email, password) => {
      try {
        const res = await request("/auth/login", {
          method: "POST",
          body: { email, password },
        });
        setToken(res.token);
        setUser(res.user);
        toast.success("Logged in successfully");
        return res;
      } catch (err) {
        const msg = err?.message || err?.errors?.[0]?.msg || "Login failed";
        toast.error(msg);
        throw err;
      }
    },
    [setToken, setUser]
  );

  const signup = useCallback(
    async (name, email, password) => {
      try {
        const res = await request("/auth/signup", {
          method: "POST",
          body: { name, email, password },
        });
        setToken(res.token);
        setUser(res.user);
        toast.success("Account created");
        return res;
      } catch (err) {
        const msg = err?.message || err?.errors?.[0]?.msg || "Signup failed";
        toast.error(msg);
        throw err;
      }
    },
    [setToken, setUser]
  );

  const logout = useCallback(() => {
    
    setToken(null);
    setUser(null);
    setApplications([]);
    toast.info("Logged out");
  }, [setToken, setUser, setApplications]);

  return {
    token,
    user,
    isAuthenticated: !!token,
    login,
    signup,
    logout,
  };
}
