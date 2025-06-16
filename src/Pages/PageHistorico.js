import React, { useEffect, useState } from "react";

function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Buscar pedidos e pagamentos paralelamente
    Promise.all([
      fetch("http://localhost:8085/projeto/api/v1/pedidos").then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar pedidos");
        return res.json();
      }),
      fetch("http://localhost:8086/projeto/api/v1/pagamentos").then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar pagamentos");
        return res.json();
      }),
    ])
      .then(([pedidosData, pagamentosData]) => {
        setPedidos(pedidosData);
        setPagamentos(pagamentosData);
      })
      .catch((err) => setErro(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando pedidos...</p>;
  if (erro) return <p style={{ color: "red" }}>Erro: {erro}</p>;

  if (pedidos.length === 0) return <p>Você não tem pedidos.</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "auto" }}>
      <h2>Meus Pedidos</h2>
      {pedidos.map((pedido) => {
        // Achar pagamento do pedido pelo id do pedido
        const pagamento = pagamentos.find(
          (p) => p.numerodopedido === pedido.id
        );

        return (
          <div
            key={pedido.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "2rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fafafa",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              Pedido #{pedido.id} - Cliente: {pedido.nome_cliente}
            </h3>
            <p>
              <strong>Total do Pedido:</strong> R${" "}
              {pedido.preco ? Number(pedido.preco).toFixed(2) : "0.00"}
            </p>

            <p>
              <strong>Forma de Pagamento:</strong>{" "}
              {pagamento ? pagamento.forma : "Não informada"}
            </p>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#ddd" }}>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                    Produto
                  </th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                    Quantidade
                  </th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                    Preço Unitário (R$)
                  </th>
                  <th style={{ padding: "0.5rem", border: "1px solid #ccc" }}>
                    Subtotal (R$)
                  </th>
                </tr>
              </thead>
              <tbody>
                {pedido.produtosPedidos &&
                  pedido.produtosPedidos.map((item, idx) => {
                    const precoUnitario =
                      Number(item.preco_unitario_produto) || 0;
                    const subtotal = precoUnitario * (item.quantidade || 0);
                    return (
                      <tr key={idx}>
                        <td
                          style={{
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                          }}
                        >
                          {item.nome_produto}
                        </td>
                        <td
                          style={{
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            textAlign: "center",
                          }}
                        >
                          {item.quantidade}
                        </td>
                        <td
                          style={{
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            textAlign: "right",
                          }}
                        >
                          {precoUnitario.toFixed(2)}
                        </td>
                        <td
                          style={{
                            padding: "0.5rem",
                            border: "1px solid #ccc",
                            textAlign: "right",
                          }}
                        >
                          {subtotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default MeusPedidos;
