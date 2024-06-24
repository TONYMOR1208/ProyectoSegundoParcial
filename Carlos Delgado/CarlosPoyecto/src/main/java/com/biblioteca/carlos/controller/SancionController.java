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

import com.biblioteca.carlos.interfacs.services.ISancionService;
import com.biblioteca.carlos.model.Sancion;

@RestController
@RequestMapping("/api/sancion")
public class SancionController {

    @Autowired
    private ISancionService sancionService;

    @GetMapping
    public ResponseEntity<List<Sancion>> getAllSanciones() {
        List<Sancion> sancionList = sancionService.list();
        return ResponseEntity.ok().body(sancionList);
    }

    @PostMapping
    public ResponseEntity<Sancion> saveSancion(@Validated @RequestBody Sancion sancion) {
        Sancion savedSancion = sancionService.save(sancion);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSancion);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Sancion>> getSancionById(@PathVariable("id") Long id) {
        Optional<Sancion> sancion = sancionService.listId(id);
        if (sancion.isPresent()) {
            return ResponseEntity.ok().body(sancion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sancion> updateSancion(@RequestBody Sancion sancion, @PathVariable("id") Long id) {
        Sancion updatedSancion = sancionService.update(id, sancion);
        return ResponseEntity.ok().body(updatedSancion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSancion(@PathVariable("id") Long id) {
        boolean deleted = sancionService.delete(id);
        if (deleted) {
            return ResponseEntity.ok().body("Sanción con id " + id + " ha sido eliminada exitosamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sanción con id " + id + " no fue encontrada.");
        }
    }
}
