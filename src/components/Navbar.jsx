import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Redux
import { logout } from "../features/auth/auth.slice"; // action pour logout
import "../css/main.css";
import logo from "../assets/img/argentBankLogo.webp";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // On récupère le prénom depuis le store Redux (profil)
  const firstName = useSelector((state) => state.profile?.firstName);

  //  Ou si c'est le userName alors const userName = useSelector((state) => state.profile?.userName);

  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const handleLogout = () => {
    dispatch(logout()); // Vide le token et l'user
    navigate("/"); // Redirection vers la home
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
        {isAuthenticated ? (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i> {firstName}
              {/* ou <i className="fa fa-user-circle"></i> {userName}
 */}
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
