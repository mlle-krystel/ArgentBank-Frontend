import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/auth.slice";
import type { RootState, AppDispatch } from "../store/store";

import logo from "/images/argentBankLogo.png";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // On récupère le prénom depuis le store Redux (profil)
  const userName = useSelector((state: RootState) => state.profile?.userName);

  const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null);

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
              <i className="fa fa-user-circle"></i> {userName}
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