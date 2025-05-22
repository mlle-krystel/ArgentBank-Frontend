import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserNameThunk } from "../features/profile/update-profile.usecase";
import "../css/main.css";

function UserEditMode({ setEditMode }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { userName, firstName, lastName } = useSelector((state) => state.profile || {});

  const [newUserName, setNewUserName] = useState(userName || "");

  if (!firstName || !lastName || !userName) {
    return <p>Chargement du profil...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserNameThunk(token, newUserName));
    setEditMode(false);
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit user info</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>User name:</label>
          <input
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
        <div className="button-group">
          <button type="submit" className="btn-save">Save</button>
          <button type="button" onClick={() => setEditMode(false)} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEditMode;
