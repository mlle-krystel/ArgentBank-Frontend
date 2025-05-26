// async thunk : Contient un thunk Redux censé gérer toute la logique de connexion utilisateur

import { loginUser } from "./auth.api";
import { getUserProfile } from "../profile/profile.api";
import { setProfile } from "../profile/profile.slice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Redux pour login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const token = await loginUser(email, password);
      const profile = await getUserProfile(token);

      dispatch(setProfile(profile));
      return token; // Ce token sera stocké dans le slice auth
    } catch (error) {
      return rejectWithValue(error.message || "Échec de connexion");
    }
  }
);
