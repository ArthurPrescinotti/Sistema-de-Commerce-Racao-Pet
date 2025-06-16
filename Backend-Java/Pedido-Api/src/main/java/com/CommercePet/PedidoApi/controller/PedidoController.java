package com.CommercePet.PedidoApi.controller;

import com.CommercePet.PedidoApi.constant.Constant;
import com.CommercePet.PedidoApi.model.Pedido;
import com.CommercePet.PedidoApi.model.ProdutosPedidos;
import com.CommercePet.PedidoApi.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE})
@RestController
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping(Constant.API_URL_PEDIDO)
    public ResponseEntity<Pedido> createPedido (@RequestBody Pedido pedido){
//        BigDecimal precoTotal = BigDecimal.ZERO;
//        for (ProdutosPedidos aux : pedido.getProdutosPedidos()) {
//            BigDecimal precoProduto = aux.getPreco_unitario_produto().multiply(BigDecimal.valueOf(aux.getQuantidade()));
//            precoTotal = precoTotal.add(precoProduto);
//        }
//        pedido.setPreco(precoTotal);
        Pedido savedPedido = pedidoService.save(pedido);
        return  ResponseEntity.status(HttpStatus.CREATED).body(savedPedido);
    }

    @PutMapping(Constant.API_URL_PEDIDO)
    public ResponseEntity<Pedido> updateProduto(@RequestBody Pedido pedido){
        Pedido savedPedido = pedidoService.save(pedido);
        return ResponseEntity.ok(savedPedido);
    }

    @DeleteMapping(Constant.API_URL_PEDIDO + "/{id}")
    public ResponseEntity<Pedido> deleteById (@PathVariable("id") Integer id){
        pedidoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(Constant.API_URL_PEDIDO)
    public ResponseEntity<List<Pedido>> findAll(){
        return ResponseEntity.ok(pedidoService.findAll());
    }

    @GetMapping(Constant.API_URL_PEDIDO + "/{id}")
    public ResponseEntity<Optional<Pedido>> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }
}
