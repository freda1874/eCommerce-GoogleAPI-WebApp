import { Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/user";

const Signup = () => {
  const navigate = useNavigate();
  const { emailPasswordSignup } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (name === "confirmPassword" || name === "password") {
      setError(""); 
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to sign up: " + error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }} onSubmit={onSubmit}>
        <h1>User Signup</h1>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={form.email}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={form.password}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
          required
          error={!!error}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
          required
          error={!!error}
        />
        {error && (
          <Typography color="error" style={{ marginBottom: "1rem" }}>
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default Signup;
