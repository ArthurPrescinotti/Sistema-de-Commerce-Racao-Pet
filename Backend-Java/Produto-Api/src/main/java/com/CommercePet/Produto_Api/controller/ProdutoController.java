package com.CommercePet.Produto_Api.controller;

import com.CommercePet.Produto_Api.constant.Constant;
import com.CommercePet.Produto_Api.model.Produto;
import com.CommercePet.Produto_Api.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE})
@RestController
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;

    @PostMapping(Constant.API_URL_PRODUTO)
    public ResponseEntity<Produto> createProduto (@RequestBody Produto produto){
        Produto savedProduto = produtoService.save(produto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(savedProduto);
    }

    @PutMapping(Constant.API_URL_PRODUTO)
    public ResponseEntity<Produto> updateProduto(@RequestBody Produto produto){
        Produto savedProduto = produtoService.save(produto);
        return ResponseEntity.ok(savedProduto);
    }

    @DeleteMapping(Constant.API_URL_PRODUTO + "/{id}")
    public ResponseEntity<Produto> deleteById (@PathVariable("id") Integer id){
        produtoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(Constant.API_URL_PRODUTO)
    public ResponseEntity<List<Produto>> findAll(){
        return ResponseEntity.ok(produtoService.findAll());
    }

    @GetMapping(Constant.API_URL_PRODUTO + "/{id}")
    public ResponseEntity<Optional<Produto>> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(produtoService.findById(id));
    }
}
