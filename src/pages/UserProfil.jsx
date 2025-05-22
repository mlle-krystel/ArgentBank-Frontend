import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/main.css";
import UserEditMode from "../components/UserEditMode";



function UserProfil() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  if (!user) return <p>Chargement...</p>;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          {!editMode ? (
            <>
              <h1>
                Welcome back
                <br />
                {user.firstName} {user.lastName}!
              </h1>
              <button className="edit-button" onClick={() => setEditMode(true)}>
                Edit Name
              </button>
            </>
          ) : (
            <UserEditMode setEditMode={setEditMode} />
          )}
        </div>
      </main>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
}

export default UserProfil;
