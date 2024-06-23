package com.biblioteca.carlos.interfacs;

import com.biblioteca.carlos.model.Sancion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISancionRepository extends JpaRepository<Sancion, Long> {


}