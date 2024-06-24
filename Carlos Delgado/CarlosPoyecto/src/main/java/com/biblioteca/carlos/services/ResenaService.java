package com.biblioteca.carlos.services;

import com.biblioteca.carlos.model.Resena;
import com.biblioteca.carlos.interfacs.services.IResenaService;
import com.biblioteca.carlos.interfacs.IResenaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResenaService implements IResenaService {

    private static final Logger logger = LoggerFactory.getLogger(ResenaService.class);

    @Autowired
    private IResenaRepository resenaRepository;

    @Override
    public List<Resena> list() {
        try {
            return resenaRepository.findAll();
        } catch (Exception e) {
            logger.error("Error al listar las reseñas: {}", e.getMessage());
            throw new RuntimeException("Error al obtener reseñas");
        }
    }

    @Override
    public Optional<Resena> findById(Integer id) {
        try {
            Optional<Resena> resena = resenaRepository.findById(id.longValue());
            if (resena.isPresent()) {
                return resena;
            } else {
                throw new RuntimeException("La reseña con el ID especificado no se encontró en la base de datos.");
            }
        } catch (Exception e) {
            logger.error("Error al obtener reseña por ID: {}", e.getMessage());
            throw new RuntimeException("No se pudo obtener la reseña. Por favor, asegúrese de proporcionar un ID válido.");
        }
    }

    @Override
    public Resena save(Resena resena) {
        // Validaciones personalizadas
        if (resena.getComentario() == null || resena.getComentario().isEmpty()) {
            throw new IllegalArgumentException("El comentario no puede ser nulo o vacío.");
        }
        if (resena.getCalificacion() == null) {
            throw new IllegalArgumentException("La calificación no puede ser nula.");
        }
        if (resena.getComentario().length() > 200) {
            throw new IllegalArgumentException("El comentario no puede tener más de 200 caracteres.");
        }
        try {
            return resenaRepository.save(resena);
        } catch (Exception e) {
            logger.error("Error al guardar la reseña: {}", e.getMessage());
            throw new RuntimeException("Error al guardar la reseña");
        }
    }

    @Override
    public Resena update(Integer id, Resena newUser) {
        try {
            Optional<Resena> existingResenaOptional = resenaRepository.findById(id.longValue());
            if (existingResenaOptional.isPresent()) {
                Resena existingResena = existingResenaOptional.get();

                // Aquí puedes agregar validaciones específicas para la actualización de la reseña

                existingResena.setLibroId(newUser.getLibroId());
                existingResena.setUsuarioId(newUser.getUsuarioId());
                existingResena.setCalificacion(newUser.getCalificacion());
                existingResena.setComentario(newUser.getComentario());

                return resenaRepository.save(existingResena);
            } else {
                throw new RuntimeException("Reseña no encontrada");
            }
        } catch (Exception e) {
            logger.error("Error al actualizar la reseña: {}", e.getMessage());
            throw new RuntimeException("Error al actualizar la reseña");
        }
    }

    @Override
    public boolean delete(Integer id) {
        try {
            Optional<Resena> resena = resenaRepository.findById(id.longValue());
            if (resena.isPresent()) {
                resenaRepository.deleteById(id.longValue());
                return true;
            } else {
                throw new RuntimeException("La reseña que intenta eliminar no se encontró en la base de datos.");
            }
        } catch (Exception e) {
            logger.error("Error al eliminar la reseña: {}", e.getMessage());
            throw new RuntimeException("No se pudo eliminar la reseña en este momento. Por favor, inténtelo de nuevo más tarde.");
        }
    }
}
