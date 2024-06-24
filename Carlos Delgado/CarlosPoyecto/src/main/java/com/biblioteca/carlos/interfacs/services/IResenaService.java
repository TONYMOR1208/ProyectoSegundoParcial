package com.biblioteca.carlos.interfacs.services;

import java.util.List;
import java.util.Optional;

import com.biblioteca.carlos.model.Resena;

public interface IResenaService {

    public List<Resena> list();
    public Optional<Resena> findById(Integer id);
    public Resena save(Resena p);
    public Resena update(Integer id, Resena newUser);
    public boolean delete(Integer userId);
}