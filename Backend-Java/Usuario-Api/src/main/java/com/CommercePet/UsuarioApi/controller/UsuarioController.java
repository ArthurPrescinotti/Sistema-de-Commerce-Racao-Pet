package com.CommercePet.UsuarioApi.controller;

import com.CommercePet.UsuarioApi.constant.Constant;
import com.CommercePet.UsuarioApi.model.Login;
import com.CommercePet.UsuarioApi.model.Usuario;
import com.CommercePet.UsuarioApi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE})
@RestController
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping(Constant.API_URL_USUARIO)
    public ResponseEntity<Usuario> createProduto(@RequestBody Usuario usuario) {
        Usuario savedProduto = usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduto);
    }

    @PutMapping(Constant.API_URL_USUARIO)
    public ResponseEntity<Usuario> updateProduto(@RequestBody Usuario usuario) {
        Usuario savedProduto = usuarioService.save(usuario);
        return ResponseEntity.ok(savedProduto);
    }

    @DeleteMapping(Constant.API_URL_USUARIO + "/{id}")
    public ResponseEntity<Usuario> deleteById(@PathVariable("id") Integer id) {
        usuarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(Constant.API_URL_USUARIO)
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping(Constant.API_URL_USUARIO + "/{id}")
    public ResponseEntity<Optional<Usuario>> findById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PostMapping(Constant.API_URL_USUARIO + "/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        // Busca o usuário pelo email
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(login.getEmail());

        // Verifica se o usuário foi encontrado
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Usuário não encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        // Verifica se a senha bate
        if (!usuario.getSenha().equals(login.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Senha incorreta");
        }

        // Se o login for bem-sucedido, retorna o usuário
        return ResponseEntity.ok(usuario);
    }
}
