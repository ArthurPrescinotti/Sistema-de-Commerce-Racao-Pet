import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "../CSS/UserStyle.css";

function PageUser({ usuario = {}, onSave }) {
  const navigate = useNavigate();

  // Guarda o id separado (não aparece no formulário)
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    email: usuario.email || "",
    senha: usuario.senha || "", // senha só para enviar, não editável
    nome: usuario.nome || "",
    sobrenome: usuario.sobrenome || "",
    cep: usuario.cep || "",
    cidade: usuario.cidade || "",
    rua: usuario.rua || "",
    bairro: usuario.bairro || "",
    numero: usuario.numero || "",
    telefone: usuario.telefone || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserId(usuario.id || null); // guarda o id do usuário
    setFormData({
      email: usuario.email || "",
      senha: usuario.senha || "",
      nome: usuario.nome || "",
      sobrenome: usuario.sobrenome || "",
      cep: usuario.cep || "",
      cidade: usuario.cidade || "",
      rua: usuario.rua || "",
      bairro: usuario.bairro || "",
      numero: usuario.numero || "",
      telefone: usuario.telefone || "",
    });
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (key !== "senha" && formData[key].trim() === "") {
        newErrors[key] = true;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // junta id com formData para enviar ao backend
      const dataToSend = { id: userId, ...formData };

      const response = await fetch(
        "http://localhost:8084/projeto/api/v1/usuarios",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.message || "Erro ao salvar os dados do usuário"
        );
      }

      const data = await response.json();

      if (onSave) onSave(data);

      alert("Dados salvos com sucesso!");
      navigate("/produtos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!usuario.email) {
    return <p>Carregando dados do usuário...</p>;
  }

  return (
    <div className="user-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit} className="user-form">
        {/* Email desabilitado */}
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email && "Email é obrigatório"}
          fullWidth
          margin="normal"
          disabled
        />

        {/* Senha não editável nem visível (input hidden) */}
        <input type="hidden" name="senha" value={formData.senha} />

        {/* Campos editáveis */}
        <TextField
          label="Nome"
          variant="outlined"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          helperText={errors.nome && "Nome é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Sobrenome"
          variant="outlined"
          name="sobrenome"
          value={formData.sobrenome}
          onChange={handleChange}
          error={errors.sobrenome}
          helperText={errors.sobrenome && "Sobrenome é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CEP"
          variant="outlined"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          error={errors.cep}
          helperText={errors.cep && "CEP é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cidade"
          variant="outlined"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          error={errors.cidade}
          helperText={errors.cidade && "Cidade é obrigatória"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rua"
          variant="outlined"
          name="rua"
          value={formData.rua}
          onChange={handleChange}
          error={errors.rua}
          helperText={errors.rua && "Rua é obrigatória"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bairro"
          variant="outlined"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          error={errors.bairro}
          helperText={errors.bairro && "Bairro é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Número"
          variant="outlined"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          error={errors.numero}
          helperText={errors.numero && "Número é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Telefone"
          variant="outlined"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          error={errors.telefone}
          helperText={errors.telefone && "Telefone é obrigatório"}
          fullWidth
          margin="normal"
        />

        <button
          type="submit"
          disabled={loading}
          className="user-edit-btn"
          style={{ marginTop: "1rem" }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>

        {error && (
          <p className="user-error" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default PageUser;
