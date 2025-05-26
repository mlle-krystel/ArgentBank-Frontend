//  Thunk Redux Toolkit qui récupère le profil utilisateur avec le token

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../profile.api.js";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (token, { rejectWithValue }) => {
    try {
      const profile = await getUserProfile(token);
      return profile;
    } catch (error) {
      return rejectWithValue(error.message || "Erreur profil");
    }
  }
);

