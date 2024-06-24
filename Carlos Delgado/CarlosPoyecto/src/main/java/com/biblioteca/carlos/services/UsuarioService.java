package com.biblioteca.carlos.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biblioteca.carlos.interfacs.IUsuarioRepository;
import com.biblioteca.carlos.interfacs.services.IUsuarioService;
import com.biblioteca.carlos.model.Usuario;
import com.biblioteca.carlos.validator.Utils;

@Service
public class UsuarioService implements IUsuarioService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> list() {
        try {
            return usuarioRepository.findAll();
        } catch (Exception e) {
            LOGGER.error("Error al obtener todos los usuarios: {}", e.getMessage());
            throw new RuntimeException("Error al obtener usuarios");
        }
    }

    @Override
    public Optional<Usuario> listId(Long id) {
        try {
            Optional<Usuario> usuario = usuarioRepository.findById(id);
            if (usuario.isPresent()) {
                return usuario;
            } else {
                throw new RuntimeException("El usuario con el ID especificado no se encontró en la base de datos.");
            }
        } catch (Exception e) {
            LOGGER.error("Error al obtener usuario por ID: {}", e.getMessage());
            throw new RuntimeException("No se pudo obtener el usuario. Por favor, asegúrese de proporcionar un ID válido.");
        }
    }

    @Override
    public Usuario save(Usuario cliente) {
        if (cliente.getNombre() == null || cliente.getNombre().isEmpty()) {
            throw new IllegalArgumentException("El nombre del usuario es obligatorio.");
        }
        if (cliente.getDireccion() == null || cliente.getDireccion().isEmpty()) {
            throw new IllegalArgumentException("La dirección del usuario es obligatoria.");
        }
        if (cliente.getTelefono() == null || cliente.getTelefono().isEmpty()) {
            throw new IllegalArgumentException("El teléfono del usuario es obligatorio.");
        }
        if (cliente.getCorreo() == null || cliente.getCorreo().isEmpty()) {
            throw new IllegalArgumentException("El correo del usuario es obligatorio.");
        }

        try {
            return usuarioRepository.save(cliente);
        } catch (Exception e) {
            LOGGER.error("Error al guardar usuario: {}", e.getMessage());
            throw new RuntimeException("Error al guardar usuario");
        }
    }


    @Override
    public Usuario update(Long id, Usuario newCliente) {
        try {
            Optional<Usuario> existingUsuarioOptional = usuarioRepository.findById(id);
            if (existingUsuarioOptional.isPresent()) {
                Usuario existingUsuario = existingUsuarioOptional.get();

                if (!Utils.esNombreValido(newCliente.getNombre())) {
                    throw new IllegalArgumentException("El nombre no es válido");
                }

                if (!Utils.esDireccionValida(newCliente.getDireccion())) {
                    throw new IllegalArgumentException("La dirección no es válida");
                }

                if (!Utils.esTelefonoValido(newCliente.getTelefono())) {
                    throw new IllegalArgumentException("El teléfono debe ser un número válido");
                }

                if (!Utils.esCorreoValido(newCliente.getCorreo())) {
                    throw new IllegalArgumentException("El correo electrónico no es válido");
                }
                existingUsuario.setId(newCliente.getId());
                existingUsuario.setNombre(newCliente.getNombre());
                existingUsuario.setDireccion(newCliente.getDireccion());
                existingUsuario.setTelefono(newCliente.getTelefono());
                existingUsuario.setCorreo(newCliente.getCorreo());
                return usuarioRepository.save(existingUsuario);
            } else {
                throw new RuntimeException("Usuario no encontrado");
            }
        } catch (Exception e) {
            LOGGER.error("Error al actualizar usuario: {}", e.getMessage());
            throw new RuntimeException("Error al actualizar usuario");
        }
    }

    @Override
    public boolean delete(Long id) {
        try {
            Optional<Usuario> usuario = usuarioRepository.findById(id);
            if (usuario.isPresent()) {
                usuarioRepository.deleteById(id);
                return true;
            } else {
                throw new RuntimeException("El usuario que intenta eliminar no se encontró en la base de datos.");
            }
        } catch (Exception e) {
            LOGGER.error("Error al eliminar usuario: {}", e.getMessage());
            throw new RuntimeException("No se pudo eliminar el usuario en este momento. Por favor, inténtelo de nuevo más tarde.");
        }
    }
}