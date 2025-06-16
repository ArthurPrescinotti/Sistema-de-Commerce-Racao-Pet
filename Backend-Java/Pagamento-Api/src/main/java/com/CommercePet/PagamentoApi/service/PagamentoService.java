package com.CommercePet.PagamentoApi.service;

import com.CommercePet.PagamentoApi.model.Pagamento;
import com.CommercePet.PagamentoApi.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    public Pagamento save(Pagamento pagamento){
        pagamentoRepository.save(pagamento);
        return pagamento;
    }

    public List<Pagamento> findAll(){
        return pagamentoRepository.findAll();
    }

    public Optional<Pagamento> findById(Integer id){
        return pagamentoRepository.findById(id);
    }

    public void deleteById(Integer id) {
        pagamentoRepository.deleteById(id);
    }
}
