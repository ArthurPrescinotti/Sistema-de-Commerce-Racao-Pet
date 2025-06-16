package com.CommercePet.PagamentoApi.controller;

import com.CommercePet.PagamentoApi.constant.Constant;
import com.CommercePet.PagamentoApi.model.Pagamento;
import com.CommercePet.PagamentoApi.service.PagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE})
@RestController
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @PostMapping(Constant.API_URL_PAGAMENTO)
    public ResponseEntity<Pagamento> createProduto (@RequestBody Pagamento pagamento){
        Pagamento savedProduto = pagamentoService.save(pagamento);
        return  ResponseEntity.status(HttpStatus.CREATED).body(savedProduto);
    }

    @PutMapping(Constant.API_URL_PAGAMENTO)
    public ResponseEntity<Pagamento> updateProduto(@RequestBody Pagamento pagamento){
        Pagamento savedProduto = pagamentoService.save(pagamento);
        return ResponseEntity.ok(savedProduto);
    }

    @DeleteMapping(Constant.API_URL_PAGAMENTO + "/{id}")
    public ResponseEntity<Pagamento> deleteById (@PathVariable("id") Integer id){
        pagamentoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(Constant.API_URL_PAGAMENTO)
    public ResponseEntity<List<Pagamento>> findAll(){
        return ResponseEntity.ok(pagamentoService.findAll());
    }

    @GetMapping(Constant.API_URL_PAGAMENTO + "/{id}")
    public ResponseEntity<Optional<Pagamento>> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(pagamentoService.findById(id));
    }
}
