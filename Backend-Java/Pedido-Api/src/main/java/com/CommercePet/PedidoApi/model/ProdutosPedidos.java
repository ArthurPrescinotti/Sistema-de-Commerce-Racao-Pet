package com.CommercePet.PedidoApi.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
@Embeddable
public class ProdutosPedidos {
    private String nome_produto;
    private Integer quantidade;
    private BigDecimal preco_unitario_produto;
}
