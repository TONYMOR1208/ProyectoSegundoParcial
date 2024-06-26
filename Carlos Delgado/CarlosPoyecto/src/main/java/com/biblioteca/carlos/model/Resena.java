package com.biblioteca.carlos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "resena")
public class Resena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resena_id;
    private Integer libro_id;
    private Integer usuario_id;
    private Integer calificacion;
    private String comentario;

    public Resena(){}

    public Resena(Integer id, Integer libro_id, Integer usuario_id, Integer calificacion, String comentario) {
        this.resena_id = id;
        this.libro_id = libro_id;
        this.usuario_id = usuario_id;
        this.calificacion = calificacion;
        this.comentario = comentario;
    }
    public Integer getId() {
        return resena_id;
    }

    public void setId(Integer id) {
        this.resena_id = id;
    }

    public Integer getLibroId() {
        return libro_id;
    }

    public void setLibroId(Integer libro_id) {
        this.libro_id = libro_id;
    }

    public Integer getUsuarioId() {
        return usuario_id;
    }

    public void setUsuarioId(Integer usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Integer getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(Integer calificacion) {
        this.calificacion = calificacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}