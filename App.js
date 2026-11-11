import "./Navbar.css";
import React, { useState } from "react";
import Login from "./Login";
import Timeline from "./Timeline";
import Profile from "./Profile";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [page, setPage] = useState("timeline");

  let userId = null;

try {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    userId = decoded.id;
  }
} catch (err) {
  console.log("Invalid token");
}
  return (
    <div>
      <h1>Twitter Clone 🚀</h1>

      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <button onClick={() => setPage("timeline")}>Home 🏠</button>
          <button onClick={() => setPage("profile")}>Profile 👤</button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
            }}
          >
            Logout 🔐
          </button>

          {page === "timeline" && <Timeline />}
          {page === "profile" && <Profile userId={userId} />}
        </>
      )}
    </div>
  );
}

export default App;
