import { Routes, Route } from "react-router-dom";
// suspense est utilisé pour le chargement dynamique des composants
import React, { Suspense } from "react";

// React.lazy() = permet de charger un composant au moment où il est nécessaire
const Layout = React.lazy(() => import("./layout/Layout"));
const Home = React.lazy(() => import("./pages/Home"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const UserProfil = React.lazy(() => import("./pages/user-profil/UserProfil"));


function App() {
  return (
      <Suspense fallback={<div>Chargement…</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<UserProfil />} />
          </Route>
        </Routes>
      </Suspense>
  );
}

export default App;