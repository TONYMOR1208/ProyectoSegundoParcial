package com.biblioteca.carlos.interfacs.services;

import com.biblioteca.carlos.model.Sancion;
import java.util.List;
import java.util.Optional;

public interface ISancionService {
    public List<Sancion> list();
    public Optional<Sancion> listId(Long id);
    public Sancion save(Sancion p);
    public Sancion update(Long id, Sancion newUser);
    public boolean delete(Long userId);
}
