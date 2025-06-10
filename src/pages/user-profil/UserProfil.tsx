import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

import { getProfile } from "../../features/profile/usecases/get-profile.usecase";

import UserEditMode from "./UserEditMode";

function UserProfil() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { firstName, lastName, loading } = useSelector(
    (state: RootState) => state.profile
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getProfile(token));
    }
  }, [dispatch, navigate, token]);

  if (loading) return <p>Chargement...</p>;
  if (!firstName || !lastName) return <p>Erreur de chargement du profil.</p>;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          {!editMode ? (
            <>
              <h1>
                Welcome back
                <br />
                {firstName} {lastName}!
              </h1>
              <button className="edit-button" onClick={() => setEditMode(true)}>
                Edit Name
              </button>
            </>
          ) : (
            <UserEditMode setEditMode={() => setEditMode(false)} />
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
