package com.CommercePet.UsuarioApi.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String senha;
    private String nome;
    private String sobrenome;
    private String cep;
    private String cidade;
    private String rua;
    private String bairro;
    private String numero;
    private String telefone;

}
