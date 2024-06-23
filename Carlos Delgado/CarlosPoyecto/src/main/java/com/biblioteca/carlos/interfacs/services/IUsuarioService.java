package com.biblioteca.carlos.interfacs.services;

import com.biblioteca.carlos.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface IUsuarioService {

    public List<Usuario> list();
    public Optional<Usuario> listId(Long id);
    public Usuario save(Usuario p);
    public Usuario update(Long id, Usuario newUser);
    public boolean delete(Long userId);


}