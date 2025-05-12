// useState = créer une boîte mémoire pour stocker des valeurs
import React, { useState } from "react";

// useNavigate() = rediriger automatiquement contrairement à Link qui créer un lien cliquable
import { useNavigate } from 'react-router-dom';

// import { useDispatch } qui sert à dispatcher des actions Redux et {useSelector} qui sert à sélectionner une partie de l'état du store Redux
import { useDispatch } from 'react-redux';

// import {loginSuccess, loginFailure} from '../features/authSlice';
import { loginSuccess } from "../features/authSlice";

import '../css/main.css';



// import { loginUser } from "../api/user"; plus utile car tout est directement fait dans le composant (fetch vers /login + /profile et dispatch vers Redux).




function LoginPage() {
  // useState = créer une boîte mémoire pour stocker des valeurs
  // Champs saisis pour l'email et le mot de passe par l'utilisateur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  //   Fonction pour naviguer entre les pages
  const navigate = useNavigate();

  // Fonction pour dispatcher les actions Redux
  const dispatch = useDispatch();



  // handleSubmit = gérer la soumission du formulaire
  // (e) => { = fonction fléchée pour récupérer l'événement
  const handleSubmit = async (e) => {
    // e.preventDefault() = empêcher le rechargement de la page
    e.preventDefault();


    // try pour essayer de se connecter 
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });


      // Récupérer la réponse du serveur
      const data = await response.json();


      // Si la connexion est réussie, on récupère le token et l'utilisateur
      if (response.ok) {
        const profileResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${data.body.token}`,
            "Content-Type": "application/json",
          },
        });

        // Récupérer les données du profil utilisateur
        const profileData = await profileResponse.json();

        // Si la récupération du profil est réussie, on dispatch l'action loginSuccess et on redirige vers la page de profil
        if (profileResponse.ok) {
          dispatch(
            loginSuccess({
              token: data.body.token,
              user: profileData.body,
            })
          );
          navigate("/profile");


        } else {
          setError("Impossible de récupérer le profil utilisateur");
        }
      } else {
        setError(data.message || "Email ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur serveur : " + err.message);
    }
  };

  return (
    <>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/* Message d'erreur affiché si besoin */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="sign-in-button" type="submit">
              Sign In
            </button>
          </form>
        </section>
      </main>

    </>
  );

}

export default LoginPage;