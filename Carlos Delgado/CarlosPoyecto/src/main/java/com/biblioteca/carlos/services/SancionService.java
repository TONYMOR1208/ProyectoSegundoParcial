package com.biblioteca.carlos.services;

import com.biblioteca.carlos.interfacs.ISancionRepository;
import com.biblioteca.carlos.interfacs.services.ISancionService;
import com.biblioteca.carlos.model.Sancion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SancionService implements ISancionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SancionService.class);

    @Autowired
    private ISancionRepository sancionRepository;

    @Override
    public List<Sancion> list() {
        try {
            return sancionRepository.findAll();
        } catch (Exception e) {
            LOGGER.error("Error al listar las sanciones: {}", e.getMessage());
            throw new RuntimeException("Error al obtener sanciones");
        }
    }

    @Override
    public Optional<Sancion> listId(Long id) {
        try {
            Optional<Sancion> sancion = sancionRepository.findById(id);
            if (sancion.isPresent()) {
                return sancion;
            } else {
                throw new RuntimeException("La sanción con el ID especificado no se encontró en la base de datos.");
            }
        } catch (RuntimeException e) {
            LOGGER.error("Error al obtener sanción por ID: {}", e.getMessage());
            throw new RuntimeException("No se pudo obtener la sanción. Por favor, asegúrese de proporcionar un ID válido.");
        } catch (Exception e) {
            LOGGER.error("Error al obtener sanción por ID: {}", e.getMessage());
            throw new RuntimeException("No se pudo obtener la sanción. Ha ocurrido un error inesperado.");
        }
    }

    @Override
    public Sancion save(Sancion sancion) {
        if (sancion.getFechaInicio().after(sancion.getFechaFin())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser mayor a la fecha de fin.");
        }
        if (sancion.getDescripcion().length() > 200) {
            throw new IllegalArgumentException("La descripción no puede tener más de 200 caracteres.");
        }
        if (sancion.getUsuarioId() == null) {
            throw new IllegalArgumentException("El ID del usuario no puede ser nulo.");
        }
        try {
            return sancionRepository.save(sancion);
        } catch (Exception e) {
            LOGGER.error("Error al guardar la sanción: {}", e.getMessage());
            throw new RuntimeException("Error al guardar sanción");
        }
    }

    @Override
    public Sancion update(Long id, Sancion newSancion) {
        try {
            Optional<Sancion> existingSancionOptional = sancionRepository.findById(id);
            if (existingSancionOptional.isPresent()) {
                Sancion existingSancion = existingSancionOptional.get();

                existingSancion.setFechaInicio(newSancion.getFechaInicio());
                existingSancion.setFechaFin(newSancion.getFechaFin());
                existingSancion.setDescripcion(newSancion.getDescripcion());
                existingSancion.setUsuarioId(newSancion.getUsuarioId());

                return sancionRepository.save(existingSancion);
            } else {
                throw new RuntimeException("Sanción no encontrada");
            }
        } catch (Exception e) {
            LOGGER.error("Error al actualizar sanción: {}", e.getMessage());
            throw new RuntimeException("Error al actualizar sanción");
        }
    }

    @Override
    public boolean delete(Long id) {
        try {
            Optional<Sancion> sancion = sancionRepository.findById(id);
            if (sancion.isPresent()) {
                sancionRepository.deleteById(id);
                return true;
            } else {
                throw new RuntimeException("La sanción que intenta eliminar no se encontró en la base de datos.");
            }
        } catch (Exception e) {
            LOGGER.error("Error al eliminar sanción: {}", e.getMessage());
            throw new RuntimeException("No se pudo eliminar la sanción en este momento. Por favor, inténtelo de nuevo más tarde.");
        }
    }
}
