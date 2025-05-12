import { createSlice } from '@reduxjs/toolkit';

// initialState est l'état initial de notre slice d'authentification

const initialState = {
    // token est initialisé à null, il sera mis à jour lors de la connexion
  token: null,
    // user est initialisé à null, il sera mis à jour lors de la connexion
  user: null,
    // error est initialisé à null, il sera mis à jour lors d'une erreur de connexion
  error: null,
};

// authSlice est le slice d'authentification et createSlice est une fonction de Redux Toolkit qui permet de créer un slice
const authSlice = createSlice({
    // name est le nom de notre slice et 'auth' est le nom de la clé dans le store Redux
  name: 'auth',
  initialState,
  reducers: {
    // loginSuccess est une action et son effet est de mettre à jour le token et l'utilisateur si la connexion est réussie
    
    loginSuccess(state, action) {
        // action.payload est l'objet qui contient le token et l'utilisateur
      state.token = action.payload.token;
        // action.payload.user est l'utilisateur qui a été authentifié
      state.user = action.payload.user;
      state.error = null; // Réinitialiser l'erreur en cas de succès
    },


    // logout est une action et son effet est de réinitialiser le token et l'utilisateur lors de la déconnexion, elle remet à null le token et l'utilisateur
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
