import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ProdutoStyle.css";
import carrinhoIcon from "../figures/add.png";
import avatar from "../figures/user.png";

function PageShop({ user, onLogout }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carrinho, setCarrinho] = useState([]);

  const navigate = useNavigate();

  // Buscar produtos da API
  const fetchProdutos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8083/projeto/api/v1/produtos"
      );
      if (!response.ok) {
        throw new Error("Erro ao carregar produtos");
      }
      const data = await response.json();
      setProdutos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      const itemExistente = prevCarrinho.find((item) => item.id === produto.id);
      if (itemExistente) {
        return prevCarrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter((item) => item.id !== produtoId)
    );
  };

  // Função que salva o pedido no backend
  const salvarPedido = async () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return false;
    }

    // Monta o objeto pedido para enviar à API
    const pedidoParaSalvar = {
      nome_cliente: user.email,
      preco: carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
      ),
      cidade: "Cidade Exemplo", // Ajuste para pegar do usuário ou formulário real
      rua: "Rua Exemplo",
      bairro: "Bairro Exemplo",
      numero: "123",
      produtosPedidos: carrinho.map((item) => ({
        nome_produto: item.nome,
        quantidade: item.quantidade,
        preco_unitario_produto: item.preco,
      })),
    };

    try {
      const response = await fetch(
        "http://localhost:8085/projeto/api/v1/pedidos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedidoParaSalvar),
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Erro ao salvar pedido: ${msg}`);
      }

      const data = await response.json();
      console.log("Pedido salvo com sucesso:", data);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const finalizarCompra = async () => {
    const sucesso = await salvarPedido();
    if (sucesso) {
      navigate("/pagamento", {
        state: {
          carrinho,
          nome_usuario: user.email,
          preco_pedido: carrinho.reduce(
            (total, item) => total + item.preco * item.quantidade,
            0
          ),
        },
      });
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="page-shop-container">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>🛍️ Loja de Produtos</h1>
        <div>
          <span style={{ marginRight: "1rem" }}>
            Olá, {user.email}{" "}
            <button
              onClick={() => navigate("/editar-usuario")}
              style={{
                marginLeft: "0.5rem",
                padding: "2px 6px",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
              title="Editar perfil"
            >
              <img src={avatar} alt="Editar Perfil" />
            </button>
            <button
              onClick={() => navigate("/historico")}
              style={{
                marginLeft: "0.5rem",
                padding: "2px 6px",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
              title="Histórico de Pagamentos"
            >
              📜 Histórico
            </button>
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {loading && <p>Carregando produtos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="conteudo-flex" style={{ display: "flex", gap: "2rem" }}>
          <div className="tabela-produtos" style={{ flex: 3 }}>
            <table className="produto-table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Peso (kg)</th>
                  <th>Preço (R$)</th>
                  <th>Disponibilidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.tipo}</td>
                    <td>{p.descricao}</td>
                    <td>{p.peso}</td>
                    <td>{p.preco.toFixed(2)}</td>
                    <td>{p.disponibilidade}</td>
                    <td>
                      <button onClick={() => adicionarAoCarrinho(p)}>
                        <img src={carrinhoIcon} alt="Adicionar" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="carrinho" style={{ flex: 1 }}>
            <h2>Carrinho</h2>
            {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                <ul>
                  {carrinho.map((item) => (
                    <li key={item.id}>
                      {item.nome} - Quantidade: {item.quantidade} - Total: R${" "}
                      {(item.preco * item.quantidade).toFixed(2)}{" "}
                      <button onClick={() => removerDoCarrinho(item.id)}>
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                  }}
                  onClick={finalizarCompra}
                >
                  Finalizar Compra
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PageShop;
