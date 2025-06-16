import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CadastroLogin from "./Pages/Cadastro_Login";
import PageShop from "./Pages/PageShop";
import PageAdm from "./Pages/PageAdm";
import PageUser from "./Pages/PageUser";
import Pagamento from "./Pages/Pagamento";
import HistoricoPagamentos from "./Pages/PageHistorico";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/produtos" replace />
            ) : (
              <CadastroLogin onLogin={setUser} />
            )
          }
        />

        <Route
          path="/editar-usuario"
          element={
            user && user.email ? (
              <PageUser usuario={user} onSave={setUser} />
            ) : (
              <p>Carregando dados do usuário...</p>
            )
          }
        />

        <Route
          path="/historico"
          element={
            user ? (
              <HistoricoPagamentos user={user} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/produtos"
          element={
            user ? (
              <PageShop user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user && user.isAdmin ? (
              <PageAdm user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/pagamento" element={<Pagamento />} />
      </Routes>
    </Router>
  );
}

export default App;
