package com.CommercePet.PagamentoApi.repository;

import com.CommercePet.PagamentoApi.model.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento,Integer> {
}
