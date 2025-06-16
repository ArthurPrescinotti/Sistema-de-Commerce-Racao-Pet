import React, { useState } from "react";
import "../CSS/Cadastro_Login.css";
import { useNavigate } from "react-router-dom";

function CadastroLogin({ onLogin }) {
  const [usuario, setUsuario] = useState({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!usuario.email || !usuario.senha) {
      setMensagem("Por favor, preencha todos os campos.");
      setErro(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8084/projeto/api/v1/usuarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );

      if (response.ok) {
        setMensagem("Cadastro realizado com sucesso!");
        setErro(false);
        setUsuario({ email: "", senha: "" });
      } else {
        const errorData = await response.json();
        setMensagem(
          "Erro no cadastro: " + (errorData.message || response.statusText)
        );
        setErro(true);
      }
    } catch (error) {
      setMensagem("Erro na conexão com o servidor.");
      setErro(true);
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usuario.email || !usuario.senha) {
      setMensagem("Por favor, preencha todos os campos.");
      setErro(true);
      return;
    }

    // Login admin
    if (usuario.email === "admin" && usuario.senha === "admin") {
      setErro(false);
      setMensagem("");
      onLogin({ email: "admin", isAdmin: true });
      navigate("/admin"); // rota admin
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8084/projeto/api/v1/usuarios/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );

      if (response.ok) {
        const userData = await response.json(); // Supondo que a API retorne o usuário
        setMensagem("Login efetuado com sucesso!");
        setErro(false);
        onLogin(userData); // <-- aqui
        navigate("/produtos");
      } else {
        const errorData = await response.json();
        setMensagem(
          "Erro no login: " + (errorData.message || response.statusText)
        );
        setErro(true);
      }
    } catch (error) {
      setMensagem("Erro na conexão com o servidor.");
      setErro(true);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card-text">
        <h2 className="card-text-title">Cadastro e Login de Usuário</h2>
        <form>
          <label className="textlabel" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="textboxinput"
            placeholder="Digite seu email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
            required
          />

          <label className="textlabel" htmlFor="senha">
            Senha:
          </label>
          <input
            id="senha"
            type="password"
            className="textboxinput"
            placeholder="Digite sua senha"
            value={usuario.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
            required
          />

          <button
            type="button"
            onClick={handleCadastro}
            className="buttonAdicionar"
            style={{ marginRight: "10px" }}
          >
            Cadastrar
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="buttonAdicionar"
          >
            Login
          </button>
        </form>

        {mensagem && (
          <p style={{ marginTop: "1em", color: erro ? "red" : "white" }}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}

export default CadastroLogin;
