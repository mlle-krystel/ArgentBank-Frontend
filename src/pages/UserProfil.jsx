import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/main.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { getUserProfile } from "../api/user";


function UserProfil() {
   // État pour stocker les infos de l'utilisateur
  const [profile, setProfile] = useState(null);
  // État pour afficher un message d'erreur s'il y en a une
  const [error, setError] = useState('');
  // Permet de rediriger l'utilisateur si besoin
  const navigate = useNavigate();

// useEffect = exécute une fonction après le premier rendu du composant ou après chaque mise à jour pour surveiller les changements
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Si pas de token, rediriger vers la page de connexion
        navigate('/login');
        return;
      }

      try {
       // Appel à l'API GET /user/profile avec le token
        const userData = await getUserProfile(token);
        setProfile(userData); // Stocke les données utilisateur
      } catch (err) {
        // Si une erreur survient, on affiche un message
        setError("Erreur de connexion au serveur");
      }
    };

    // Appel de la fonction pour récupérer le profil utilisateur
    fetchProfile();
  }, [navigate]); // [navigate] ne s'exécute qu'une fois au premier rendu du composant pour éviter les boucles infinies


    // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Supprime le token du localStorage et redirige vers la page d'accueil
    localStorage.removeItem("token");
    navigate('/');
  };

    // Si une erreur survient, on l'affiche
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

    // Si le profil n'est pas encore chargé, on affiche un message de chargement
  if (!profile) return <p>Chargement...</p>;


//   Si tout est bon, on affiche le profil utilisateur
  return (
    <>
    <Navbar />
    
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{profile.firstName} {profile.lastName}!</h1>
          <button className="edit-button">Edit Name</button>
        </div>
      </main>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      
        <Footer />
    </>
  );
}

export default UserProfil;
