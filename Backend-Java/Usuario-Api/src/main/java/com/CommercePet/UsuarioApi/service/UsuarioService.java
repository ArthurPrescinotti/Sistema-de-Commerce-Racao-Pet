package com.CommercePet.UsuarioApi.service;

import com.CommercePet.UsuarioApi.model.Usuario;
import com.CommercePet.UsuarioApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario save(Usuario usuario){
        usuarioRepository.save(usuario);
        return usuario;
    }

    public List<Usuario> findAll(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(Integer id){
        return usuarioRepository.findById(id);
    }

    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}
