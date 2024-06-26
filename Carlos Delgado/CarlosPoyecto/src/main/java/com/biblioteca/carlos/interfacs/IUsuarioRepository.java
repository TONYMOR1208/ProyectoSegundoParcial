package com.biblioteca.carlos.interfacs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.biblioteca.carlos.model.Usuario;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
}