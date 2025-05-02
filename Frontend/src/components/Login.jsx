import React, { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const currentTheme = document.body.classList.contains("dark-theme");
    setIsDarkTheme(currentTheme);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      const token = response.data;
      if (token && token.startsWith("ey")) {
        localStorage.setItem("token", token);
        setSuccessMsg("You're successfully logged in. Go to Home page!");
      } else {
        setErrorMsg("Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Login failed. Please try again.");
    }
  };

  const labelStyle = {
    color: isDarkTheme ? "white" : "black",
    fontWeight: "bold",
  };

  const h1Style = {
    paddingTop: "7rem",
    color: isDarkTheme ? "white" : "black",
  };

  return (
    <div style={{ height: "100vh", textAlign: "center" }}>
      <h1 style={h1Style}>Login</h1>

      <form
        onSubmit={handleLogin}
        style={{ display: "inline-block", textAlign: "left", maxWidth: "300px" }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username" style={labelStyle}>
            Username:
          </label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password" style={labelStyle}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
