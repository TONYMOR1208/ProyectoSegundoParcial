package com.biblioteca.carlos.interfacs.services;

import com.biblioteca.carlos.model.Resena;

import java.util.List;
import java.util.Optional;

public interface IResenaService {

    public List<Resena> list();
    public Optional<Resena> findById(Integer id);
    public Resena save(Resena p);
    public Resena update(Integer id, Resena newUser);
    public boolean delete(Integer userId);
}
