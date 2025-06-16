package com.CommercePet.Produto_Api.service;

import com.CommercePet.Produto_Api.model.Produto;
import com.CommercePet.Produto_Api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto save(Produto produto){
        produtoRepository.save(produto);
        return produto;
    }

    public List<Produto> findAll(){
        return produtoRepository.findAll();
    }

    public Optional<Produto> findById(Integer id){
        return produtoRepository.findById(id);
    }

    public void deleteById(Integer id) {
        produtoRepository.deleteById(id);
    }
}
