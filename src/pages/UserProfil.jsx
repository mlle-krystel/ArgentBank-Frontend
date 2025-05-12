import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/main.css';



function UserProfil() {
  // user est la variable que tu as récupérée avec Redux
  const user = useSelector((state) => state.auth.user);

  // Récupération du token depuis le store Redux
  const token = useSelector((state) => state.auth.token);

  // Permet de rediriger l'utilisateur si besoin
  const navigate = useNavigate();

  // useEffect = exécute une fonction après le premier rendu du composant ou après chaque mise à jour pour surveiller les changements
  useEffect(() => {

    if (!token) {
      // Si pas de token, rediriger vers la page de connexion
      navigate('/login');
    }
  }, [navigate, token]); // [navigate, token] = tableau de dépendances pour éviter les boucles infinies


  if (!user) return <p>Chargement...</p>;


  //   Si tout est bon, on affiche le profil utilisateur
  return (
    <>

      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
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



    </>
  );
}

export default UserProfil;
