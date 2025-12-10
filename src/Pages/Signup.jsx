import React, { useContext, useState } from "react";

import {
  MainContainer,
  CardContainer,
  Title,
  Form,
  Input,
  Actions,
  Button,
  LinkText,
} from "../Style/Register";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext"; 
import { request } from "../api/api";
import { toast } from "react-toastify";

export default function Signup() {
  const { setToken, setUser } = useContext(AppContext);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await request("/auth/signup", {
        method: "POST",
        body: form,
      });

      setToken(response.token);
      setUser(response.user);

      toast.success("Your account has been created!");
      navigate("/");
    } catch (error) {
      console.error("Signup error (client):", error);
      const message =
        error?.message ||
        error?.errors?.map((item) => item.msg).join(", ") ||
        "Signup failed.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <CardContainer>
        <Title>Create your account</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <Actions>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <LinkText to="/login">Already have an account?</LinkText>
          </Actions>
        </Form>
      </CardContainer>
    </MainContainer>
  );
}
