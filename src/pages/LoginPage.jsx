// useState = créer une boîte mémoire pour stocker des valeurs
import React, {useState} from "react";

// useNavigate() = rediriger automatiquement contrairement à Link qui créer un lien cliquable
import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import { loginUser } from "../api/user";


function LoginPage() {
    // useState = créer une boîte mémoire pour stocker des valeurs
    // Champs saisis pour l'email et le mot de passe par l'utilisateur
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Message d'erreur à afficher si login échoue
  const [error, setError] = useState("");

//   Fonction pour naviguer entre les pages
    const navigate = useNavigate();


// handleSubmit = gérer la soumission du formulaire
    // (e) => { = fonction fléchée pour récupérer l'événement
    const handleSubmit = async (e) => {
         // e.preventDefault() = empêcher le rechargement de la page
        e.preventDefault();
       setError(""); // Réinitialiser l'erreur avant de soumettre le formulaire

        // try pour essayer de se connecter 
       try {
        const token = await loginUser(email, password);
      localStorage.setItem("token", token); 
        // Redirection vers la page de profil après la connexion réussie
        navigate("/profile");
    } catch (error) {
        setError("Erreur de connexion");
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