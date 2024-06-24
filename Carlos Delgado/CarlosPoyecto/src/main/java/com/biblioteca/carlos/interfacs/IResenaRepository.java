package com.biblioteca.carlos.interfacs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.biblioteca.carlos.model.Resena;

@Repository
public interface IResenaRepository extends JpaRepository<Resena, Long>{
    
}