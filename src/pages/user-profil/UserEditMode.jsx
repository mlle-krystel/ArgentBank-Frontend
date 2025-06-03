import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/profile/usecases/update-profile.usecase";
import "./UserEditMode.css";

function UserEditMode({ setEditMode }) {
  const dispatch = useDispatch();
  // On extrait les informations de l'utilisateur depuis le store
  const { userName, firstName, lastName, loading } = useSelector(
    (state) => state.profile || {}
  );

  // Etat local pour gérer le nouveau pseudo de l'utilisateur
  const [newUserName, setNewUserName] = useState(userName || "");
  //  Si une erreur survient lors de la mise à jour du profil, on l'affiche
  const [error, setError] = useState("");

  // On affiche un message de chargement si le profil est en cours de chargement
  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  // Gère la soumission du formulaire de modification du pseudo
  const handleSubmit = async (e) => {
    e.preventDefault();

    // On décenche l'action de mise à jour du profil avec le nouveau pseudo et on attend le résultat
    const result = await dispatch(updateProfile({ newUserName }));

    if (updateProfile.fulfilled.match(result)) {
      setEditMode(false);
    } else {
      // Si la mise à jour échoue, on affiche un message d'erreur
      setError("Erreur lors de la mise à jour du pseudo.");
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit user info</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userName">User name:</label>
          <input
            id="userName"
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>First name:</label>
          <input type="text" value={firstName} disabled />
        </div>

        <div className="input-group">
          <label>Last name:</label>
          <input type="text" value={lastName} disabled />
        </div>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        <div className="button-group">
          <button type="submit" className="btn-save">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditMode;
