import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();

  // Tenta pegar do location.state primeiro
  let { carrinho, nome_usuario, preco_pedido } = location.state || {};

  // Se não tiver dados no state, tenta buscar do localStorage
  useEffect(() => {
    if (
      (!carrinho || !nome_usuario || !preco_pedido) &&
      typeof window !== "undefined"
    ) {
      const pedidoSalvo = localStorage.getItem("pedido");
      if (pedidoSalvo) {
        const pedidoObj = JSON.parse(pedidoSalvo);
        carrinho = carrinho || pedidoObj.carrinho;
        nome_usuario = nome_usuario || pedidoObj.nome_usuario;
        preco_pedido = preco_pedido || pedidoObj.preco_pedido;
      }
    }
  }, []); // só roda uma vez ao montar

  // Estado para forma de pagamento
  const [formaPagamento, setFormaPagamento] = useState("Crédito");

  // Estado para controlar loading e erro
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  // Aviso se não tiver dados
  if (!carrinho || !nome_usuario) {
    return <p>Dados do pedido não encontrados. Volte à loja.</p>;
  }

  const confirmarPagamento = async () => {
    setLoading(true);
    setErro(null);

    try {
      // Monta objeto do pagamento conforme seu backend espera
      const pagamento = {
        nome_usuario,
        preco_pedido,
        forma: formaPagamento,
        numerodopedido: 0, // se tiver o id do pedido, colocar aqui. Senão, ajustar conforme fluxo.
        status_confirmacao: false,
      };

      const res = await fetch(
        "http://localhost:8086/projeto/api/v1/pagamentos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pagamento),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao confirmar pagamento");
      }

      alert(
        `Pagamento confirmado! Forma: ${formaPagamento}. Obrigado pela compra.`
      );

      // Limpa localStorage
      localStorage.removeItem("pedido");

      navigate("/"); // redireciona para home ou página desejada
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Pagamento</h2>
      <p>
        Cliente: <strong>{nome_usuario}</strong>
      </p>
      <p>
        Total do pedido: <strong>R$ {Number(preco_pedido).toFixed(2)}</strong>
      </p>

      <div>
        <label htmlFor="formaPagamento">Forma de pagamento: </label>
        <select
          id="formaPagamento"
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
          <option value="Pix">Pix</option>
        </select>
      </div>

      <h3>Produtos</h3>
      <ul>
        {carrinho.map((item) => (
          <li key={item.id}>
            {item.nome} - Quantidade: {item.quantidade} - Total: R${" "}
            {(item.preco * item.quantidade).toFixed(2)}
          </li>
        ))}
      </ul>

      {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}

      <button
        onClick={confirmarPagamento}
        style={{ marginTop: "1rem" }}
        disabled={loading}
      >
        {loading ? "Confirmando..." : "Confirmar Pagamento"}
      </button>
    </div>
  );
}

export default Pagamento;
