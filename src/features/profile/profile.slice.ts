import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./usecases/get-profile.usecase";
import { updateProfile } from "./usecases/update-profile.usecase";

// Définition du type représentant l'état du profil utilisateur dans le store
type ProfileState = {
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  email: string | null;
  error: string | null;
  loading: boolean;
};

// Initialisation de l'état par défaut
const initialState: ProfileState = {
  firstName: null,
  lastName: null,
  userName: null,
  email: null,
  error: null,
  loading: false,
};

// Création du slice Redux pour gérer les données du profil utilisateur
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Pendant la récupération du profil : on active le chargement et réinitialise les erreurs
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Lorsque la récupération réussit : on injecte les données dans le state
      .addCase(getProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.loading = false;
      })

      // En cas d’échec de récupération du profil : on stocke l’erreur
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = "Erreur lors de la récupération du profil";
        }
      })

      // Lors du démarrage de la mise à jour du profil : on active le chargement
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Si la mise à jour du profil réussit : on met à jour uniquement le nom d'utilisateur
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.loading = false;
      })

      // En cas d’échec de mise à jour : on stocke l’erreur
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = "Erreur lors de la mise à jour du pseudo";
        }
      });
  },
});

export default profileSlice.reducer;
