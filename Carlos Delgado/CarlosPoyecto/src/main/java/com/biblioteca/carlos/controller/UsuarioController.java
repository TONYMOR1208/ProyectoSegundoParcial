package com.biblioteca.carlos.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.carlos.interfacs.services.IUsuarioService;
import com.biblioteca.carlos.model.Usuario;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarioList = usuarioService.list();
        return ResponseEntity.ok().body(usuarioList);
    }

    @PostMapping
    public ResponseEntity<Usuario> saveUsuario(@Validated @RequestBody Usuario usuario) {
        Usuario savedUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Usuario>> getUsuarioById(@PathVariable("id") Long id) {
        Optional<Usuario> usuario = usuarioService.listId(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok().body(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@RequestBody Usuario usuario, @PathVariable("id") Long id) {
        Usuario updatedUsuario = usuarioService.update(id, usuario);
        return ResponseEntity.ok().body(updatedUsuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUsuarioById(@PathVariable("id") Long id) {
        boolean deleted = usuarioService.delete(id);
        if (deleted) {
            return ResponseEntity.ok().body("Usuario con id " + id + " ha sido eliminado exitosamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario con id " + id + " no fue encontrado.");
        }
    }
}