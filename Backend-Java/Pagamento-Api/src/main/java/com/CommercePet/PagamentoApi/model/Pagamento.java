package com.CommercePet.PagamentoApi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "pagamentos")
@Getter
@Setter
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private BigDecimal preco_pedido;
    private String nome_usuario;
    private String forma;
    private Integer numerodopedido;
    private boolean status_confirmacao;
}
