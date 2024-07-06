import { Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";


const PasswordReset = () => {
  const navigate = useNavigate();
  const { user, resetPassword } = useContext(UserContext);
  
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [error, setError] = useState("");

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (name === "confirmNewPassword" || name === "newPassword") {
      setError("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match!");
      return;
    }
    if (!user || !user.profile || !user.profile.email) {
      toast.error("User is not logged in or user profile is incomplete.");
      return;
    }
    try {
      await resetPassword(user.email, form.oldPassword, form.newPassword);
      toast.success("Password reset successful！");
      navigate("/");
    } catch (error) {
      toast.error("Password reset failed：" + error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }} onSubmit={onSubmit}>
        <h1>Password reset</h1>
        <TextField
          label="Old Password"
          type="password"
          variant="outlined"
          name="oldPassword"
          value={form.oldPassword}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          name="newPassword"
          value={form.newPassword}
          onChange={onFormInputChange}
          style={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          variant="outlined"
          name="confirmNewPassword"
          value={form.confirmNewPassword}
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
          Password reset
        </Button>
      </form>
    </>
  );
};

export default PasswordReset;