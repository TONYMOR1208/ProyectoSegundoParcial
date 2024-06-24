package com.biblioteca.carlos.interfacs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.biblioteca.carlos.model.Sancion;

@Repository
public interface ISancionRepository extends JpaRepository<Sancion, Long> {


}