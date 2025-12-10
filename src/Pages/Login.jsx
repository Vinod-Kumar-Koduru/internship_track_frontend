import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/Appcontext"; 
import { request } from "../api/api";
import { toast } from "react-toastify";
import {
  LoginContainer,
  LoginPanel,
  LoginTitle,
  LoginForm,
  FormActions,
  AuthLink,
} from "../Style/Logincss";

export default function Login() {
  const { setToken, setUser } = useContext(AppContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Provide email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await request("/auth/login", { method: "POST", body: form });
      setToken(res.token);
      setUser(res.user);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      console.error("Login error (client):", err);
      const msg =
        err?.message ||
        (err?.errors
          ? err.errors.map((x) => x.msg).join(", ")
          : "Login failed");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginPanel>
        <LoginTitle>Login</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={handleChange}
            autoComplete="email" 
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password" 
            required
          />
          <FormActions>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <AuthLink>
              <Link to="/signup">Create account</Link>
            </AuthLink>
          </FormActions>
        </LoginForm>
      </LoginPanel>
    </LoginContainer>
  );
}
