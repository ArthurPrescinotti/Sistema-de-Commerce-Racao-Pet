import * as React from "react";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../CSS/ProdutoStyle.css";
import editIcon from "../figures/Edit.png";
import deleteIcon from "../figures/Delete.png";
import setaesquerda from "../figures/seta-esquerda.png";
import setadireita from "../figures/seta-direita.png";

function ProdutoCRUD({ onLogout, user }) {
  const navigate = useNavigate();

  // Estado para armazenar os produtos
  const [produtos, setProdutos] = useState([]);
  // Estado para o produto sendo editado ou novo
  const [produto, setProduto] = useState({
    id: null, // Adicionando a chave ID aqui, para identificação ao editar
    nome: "",
    tipo: "",
    descricao: "",
    peso: "",
    preco: "",
    disponibilidade: "",
  });
  // Estado para editar produto
  const [editando, setEditando] = useState(null);
  // Estado para erro de requisição
  const [error, setError] = useState(false);
  // Estado para erro no formulário
  const [errors, setErrors] = useState({
    nome: false,
    tipo: false,
    descricao: false,
    peso: false,
    preco: false,
    disponibilidade: false,
  });

  // Paginação
  const [quantidadePaginas, setQuantidadePaginas] = useState(1);
  const [linhasPorPagina] = useState(9);

  // Buscar produtos da API
  const fetchProdutos = async () => {
    setError(false);
    try {
      const response = await fetch(
        "http://localhost:8083/projeto/api/v1/produtos"
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar os produtos");
      }

      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função de submit (criação ou edição de produto)
  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (
      !produto.nome ||
      !produto.tipo ||
      !produto.descricao ||
      !produto.peso ||
      !produto.preco ||
      !produto.disponibilidade
    ) {
      setErrors({
        nome: !produto.nome,
        tipo: !produto.tipo,
        descricao: !produto.descricao,
        peso: !produto.peso,
        preco: !produto.preco,
        disponibilidade: !produto.disponibilidade,
      });
      alert("Campos em vermelho são obrigatórios!");
      return;
    }

    // Resetar erros
    setErrors({
      nome: false,
      tipo: false,
      descricao: false,
      peso: false,
      preco: false,
      disponibilidade: false,
    });

    const novoProduto = {
      ...produto,
      peso: parseFloat(produto.peso),
      preco: parseFloat(produto.preco),
      disponibilidade: parseInt(produto.disponibilidade, 10),
    };

    const method = editando ? "PUT" : "POST";
    const url = "http://localhost:8083/projeto/api/v1/produtos"; // A URL continua a mesma para PUT e POST

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto), // Envia o produto completo, incluindo o id no corpo
      });

      if (response.ok) {
        await fetchProdutos();
        setProduto({
          id: null, // Reseta o id após a criação/edição
          nome: "",
          tipo: "",
          descricao: "",
          peso: "",
          preco: "",
          disponibilidade: "",
        });
        setEditando(null);
        alert(
          editando
            ? "Produto atualizado com sucesso!"
            : "Produto cadastrado com sucesso!"
        );
      } else {
        alert("Erro ao salvar o produto.");
      }
    } catch (error) {
      alert("Erro na conexão com a API: " + error.message);
    }
  };

  // Função de edição de produto
  const handleEdit = (produto) => {
    setProduto({
      id: produto.id, // Passando o id para o produto
      nome: produto.nome,
      tipo: produto.tipo,
      descricao: produto.descricao,
      peso: produto.peso.toString(),
      preco: produto.preco.toString(),
      disponibilidade: produto.disponibilidade.toString(),
    });
    setEditando(produto.id);
  };

  // Função de deletar produto
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      const response = await fetch(
        `http://localhost:8083/projeto/api/v1/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await fetchProdutos();
      } else {
        alert("Erro ao deletar o produto.");
      }
    } catch (error) {
      alert("Erro na conexão com a API: " + error.message);
    }
  };

  // Funções de paginação
  const indexUltimaLinha = quantidadePaginas * linhasPorPagina;
  const indexPrimeiraLinha = indexUltimaLinha - linhasPorPagina;
  const produtosPaginaAtual = produtos.slice(
    indexPrimeiraLinha,
    indexUltimaLinha
  );

  const handleProximaPagina = () => {
    if (quantidadePaginas < Math.ceil(produtos.length / linhasPorPagina)) {
      setQuantidadePaginas(quantidadePaginas + 1);
    }
  };

  const handleAnteriorPagina = () => {
    if (quantidadePaginas > 1) {
      setQuantidadePaginas(quantidadePaginas - 1);
    }
  };

  // Função de logout
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="produto-container">
      {/* Header com Logout e usuário */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <span style={{ marginRight: "1rem" }}>
            Olá, {user ? user.email : "Usuário"}
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <h1 className="produto-textboxTitle">🛒 Gerenciamento de Produtos 🛒</h1>

      {/* Formulário */}
      <div>
        <TextField
          label="Nome"
          variant="outlined"
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          error={errors.nome}
          helperText={errors.nome && "Nome é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tipo"
          variant="outlined"
          value={produto.tipo}
          onChange={(e) => setProduto({ ...produto, tipo: e.target.value })}
          error={errors.tipo}
          helperText={errors.tipo && "Tipo é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          variant="outlined"
          value={produto.descricao}
          onChange={(e) =>
            setProduto({ ...produto, descricao: e.target.value })
          }
          error={errors.descricao}
          helperText={errors.descricao && "Descrição é obrigatória"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Peso (kg)"
          variant="outlined"
          type="number"
          value={produto.peso}
          onChange={(e) => setProduto({ ...produto, peso: e.target.value })}
          error={errors.peso}
          helperText={errors.peso && "Peso é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Preço (R$)"
          variant="outlined"
          type="number"
          value={produto.preco}
          onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
          error={errors.preco}
          helperText={errors.preco && "Preço é obrigatório"}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Disponibilidade"
          variant="outlined"
          type="number"
          value={produto.disponibilidade}
          onChange={(e) =>
            setProduto({ ...produto, disponibilidade: e.target.value })
          }
          error={errors.disponibilidade}
          helperText={errors.disponibilidade && "Disponibilidade é obrigatória"}
          fullWidth
          margin="normal"
        />

        <div className="produto-botao-container">
          <Tooltip
            title={editando ? "Atualizar Produto" : "Adicionar Produto"}
            placement="top"
            slotProps={{
              popper: {
                modifiers: [{ name: "offset", options: { offset: [0, -12] } }],
              },
            }}
          >
            <button onClick={handleSubmit} className="produto-buttonAdicionar">
              {editando ? "Atualizar Produto" : "Adicionar Produto"}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Tabela de produtos */}
      {!error && (
        <table className="produto-table">
          <thead>
            <tr>
              <th className="produto-textboxMostra">Nome</th>
              <th className="produto-textboxMostra">Tipo</th>
              <th className="produto-textboxMostra">Descrição</th>
              <th className="produto-textboxMostra">Peso (kg)</th>
              <th className="produto-textboxMostra">Preço (R$)</th>
              <th className="produto-textboxMostra">Disponibilidade</th>
              <th className="produto-textboxMostra">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosPaginaAtual.map((p) => (
              <tr key={p.id}>
                <td className="produto-textboxMostra">
                  <Tooltip
                    title={p.nome}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -16],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <span>{p.nome}</span>
                  </Tooltip>
                </td>
                <td className="produto-textboxMostra">
                  <Tooltip
                    title={p.tipo}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -16],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <span>{p.tipo}</span>
                  </Tooltip>
                </td>
                <td className="produto-textboxMostra">
                  <Tooltip
                    title={p.descricao}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -16],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <span>{p.descricao}</span>
                  </Tooltip>
                </td>
                <td className="produto-textboxMostra">
                  <Tooltip
                    title={p.peso}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -16],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <span>{p.peso}</span>
                  </Tooltip>
                </td>
                <td className="produto-textboxMostra">
                  <Tooltip
                    title={p.preco}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -16],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <span>{p.preco}</span>
                  </Tooltip>
                </td>
                <td className="produto-textboxMostra">
                  <Tooltip
                    title={p.disponibilidade}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -16],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <span>{p.disponibilidade}</span>
                  </Tooltip>
                </td>
                <td className="produto-textboxMostra">
                  <Tooltip
                    title="Editar"
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -12],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <button
                      onClick={() => handleEdit(p)}
                      className="produto-button"
                      aria-label="Editar produto"
                    >
                      <img src={editIcon} alt="Editar" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Deletar"
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -12],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="produto-button"
                      aria-label="Deletar produto"
                    >
                      <img src={deleteIcon} alt="Deletar" />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {<p>Carregando...</p>}
      {error && <p>{error}</p>}

      {/* Paginação */}
      <div className="produto-textboxMostra produto-textPaginacao">
        <button
          className="produto-buttonPaginacao"
          onClick={handleAnteriorPagina}
          disabled={quantidadePaginas === 1}
        >
          <img src={setaesquerda} alt="Página anterior" />
        </button>
        Página {quantidadePaginas} de{" "}
        {Math.ceil(produtos.length / linhasPorPagina)}
        <button
          className="produto-buttonPaginacao"
          onClick={handleProximaPagina}
          disabled={
            quantidadePaginas === Math.ceil(produtos.length / linhasPorPagina)
          }
        >
          <img src={setadireita} alt="Próxima página" />
        </button>
      </div>
    </div>
  );
}

export default ProdutoCRUD;
