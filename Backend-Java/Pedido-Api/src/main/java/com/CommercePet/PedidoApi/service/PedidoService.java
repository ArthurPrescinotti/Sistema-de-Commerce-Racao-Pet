package com.CommercePet.PedidoApi.service;

import com.CommercePet.PedidoApi.model.Pedido;
import com.CommercePet.PedidoApi.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido save(Pedido pedido){
        pedidoRepository.save(pedido);
        return pedido;
    }

    public List<Pedido> findAll(){
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> findById(Integer id){
        return pedidoRepository.findById(id);
    }

    public void deleteById(Integer id) {
        pedidoRepository.deleteById(id);
    }

}
