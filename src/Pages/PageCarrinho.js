import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

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

  return (
    <CartContext.Provider
      value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}
    >
      {children}
    </CartContext.Provider>
  );
}
