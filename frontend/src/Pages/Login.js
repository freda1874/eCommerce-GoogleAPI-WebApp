import { Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/user";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const redirectNow = () => {
    const redirectTo = new URLSearchParams(location.search).get("redirectTo");
    navigate(redirectTo ? redirectTo : "/");
  };

  // if the user is already logged in, redirect
  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login button.
  const onSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const user = await emailPasswordLogin(form.email, form.password);
      if (user) {
        toast.success("Login successful!");
        redirectNow();
      }
    } catch (error) {
      if (error.statusCode === 401) {
        toast.error("Invalid username/password. Try again!");
      } else {
        toast.error("Failed to log in: " + error.message);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }} onSubmit={onSubmit}>
        <h1>User Login</h1>
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
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;