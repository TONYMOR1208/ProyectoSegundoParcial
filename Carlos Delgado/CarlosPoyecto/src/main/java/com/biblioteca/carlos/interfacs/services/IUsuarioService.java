package com.biblioteca.carlos.interfacs.services;

import java.util.List;
import java.util.Optional;

import com.biblioteca.carlos.model.Usuario;

public interface IUsuarioService {

    public List<Usuario> list();
    public Optional<Usuario> listId(Long id);
    public Usuario save(Usuario p);
    public Usuario update(Long id, Usuario newUser);
    public boolean delete(Long userId);


}