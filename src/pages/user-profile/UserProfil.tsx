import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

import { getProfile } from "../../features/profile/usecases/get-profile.usecase";
import UserEditMode from "./UserEditMode";
import AccountCard from "../../components/AccountCard";

function UserProfil() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { firstName, lastName, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
  if (!token) {
    // Redirige vers la page d'accueil si pas de token
     navigate("/", { replace: true });
    return;
  }
  dispatch(getProfile(token));
}, [dispatch, navigate, token]);


  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
if (!firstName || !lastName) return <p>Chargement...</p>;

  const accounts = [
    {
      id: "checking",
      title: "Argent Bank Checking (x8349)",
      amount: "$48,098.43",
      description: "Available Balance",
    },
    {
      id: "savings",
      title: "Argent Bank Savings (x6712)",
      amount: "$9,250.00",
      description: "Available Balance",
    },
    {
      id: "credit",
      title: "Argent Bank Credit Card (x8349)",
      amount: "$489.00",
      description: "Current Balance",
    },
  ];

  return (
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

      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
}

export default UserProfil;
