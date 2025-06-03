// Fait le lien entre API et Redux (appel getUserProfile → dispatch Redux)
import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateUserName } from "../profile.api";

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ newUserName }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    try {
      const profile = await updateUserName(token, newUserName);
      return profile;
    } catch (error) {
      return rejectWithValue(error.message || "Erreur profil");
    }
  }
);
