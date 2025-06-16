package com.CommercePet.PedidoApi.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Getter
@Setter
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ElementCollection
    private List <ProdutosPedidos> produtosPedidos;
    private String nome_cliente;
    private BigDecimal preco;
    private String cidade;
    private String rua;
    private String bairro;
    private String numero;

}
