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

import com.biblioteca.carlos.interfacs.services.IResenaService;
import com.biblioteca.carlos.model.Resena;

@RestController
@RequestMapping("/resenas")
public class ResenaController {

    @Autowired
    private IResenaService resenaService;

    @GetMapping
    public ResponseEntity<List<Resena>> getAllResenas() {
        List<Resena> resenaList = resenaService.list();
        return ResponseEntity.ok().body(resenaList);
    }

    @PostMapping
    public ResponseEntity<Resena> saveResena(@Validated @RequestBody Resena resena) {
        Resena savedResena = resenaService.save(resena);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResena);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Resena>> getResenaById(@PathVariable("id") Integer id) {
        Optional<Resena> resenaOptional = resenaService.findById(id);
        if (resenaOptional.isPresent()) {
            return ResponseEntity.ok().body(resenaOptional);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resena> updateResena(@RequestBody Resena resena, @PathVariable("id") Integer id) {
        Resena updatedResena = resenaService.update(id, resena);
        return ResponseEntity.ok().body(updatedResena);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResenaById(@PathVariable("id") Integer id) {
        boolean deleted = resenaService.delete(id);
        if (deleted) {
            return ResponseEntity.ok().body("Reseña con id " + id + " ha sido eliminada exitosamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reseña con id " + id + " no fue encontrada.");
        }
    }
    
}