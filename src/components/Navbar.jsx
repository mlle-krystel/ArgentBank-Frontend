import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/main.css";
import logo from "../img/argentBankLogo.png";
import { getUserProfile } from "../api/user";

function Navbar() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserProfile(token)
        .then((data) => setFirstName(data.firstName))
        .catch(() => {
          // Si token invalide : on efface et on redirige
          localStorage.removeItem("token");
          setFirstName(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {firstName ? (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i> {firstName}
            </span>
            <button
              onClick={handleLogout}
              className="main-nav-item"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
