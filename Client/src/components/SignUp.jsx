import React, {useState, useEffect} from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const currentTheme = document.body.classList.contains("dark-theme");
    setIsDarkTheme(currentTheme);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/register", {
        username,
        password,
        role,
      });

      console.log("User registered:", response.data);
      setSignupSuccess(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed.");
    }
  };

  const labelStyle = {
    color: isDarkTheme ? "white" : "black",
    fontWeight: "bold"
  };

  const h1Style = {
    paddingTop: "7rem",
    color: isDarkTheme ? "white" : "black"
  };

  return (
    <div style={{textAlign: "center", height: "100vh"}}>
      <h1 style={h1Style}>Signup</h1>
      <br />
      <div>
        <form onSubmit={handleSignup}>
          <div style={{marginBottom: "1rem"}}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{marginBottom: "1rem"}}>
            <label htmlFor="pass" style={labelStyle}>Password</label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{marginBottom: "1rem"}}>
            <span style={labelStyle}>Select Role: </span>
            <label style={{marginLeft: "1rem", ...labelStyle}}>
              <input
                type="radio"
                name="role"
                value="CUSTOMER"
                checked={role === "CUSTOMER"}
                onChange={(e) => setRole(e.target.value)}
              />
              Customer
            </label>
            <label style={{marginLeft: "1rem", ...labelStyle}}>
              <input
                type="radio"
                name="role"
                value="VENDOR"
                checked={role === "VENDOR"}
                onChange={(e) => setRole(e.target.value)}
              />
              Vendor
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
        {signupSuccess && (
          <p style={{marginTop: "1rem", color: "green"}}>
            Signup successful! <a href="/login">Login now</a> to continue.
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
