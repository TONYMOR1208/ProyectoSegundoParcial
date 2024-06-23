package com.biblioteca.carlos.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;

@Entity
public class Sancion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sancion_id;
    private Integer usuario_id;
    private Date fecha_inicio;
    private Date fecha_fin;
    private String descripcion;

    public Sancion(){}

    public Sancion(Integer id, Integer usuario_id, Date fecha_inicio, Date fecha_fin, String descripcion) {
        this.sancion_id = id;
        this.usuario_id = usuario_id;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.descripcion = descripcion;
    }
    public Integer getId() {
        return sancion_id;
    }

    public void setId(Integer id) {
        this.sancion_id = id;
    }
    
    public Integer getUsuarioId() {
        return usuario_id;
    }

    public void setUsuarioId(Integer usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Date getFechaInicio() {
        return fecha_inicio;
    }

    public void setFechaInicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public Date getFechaFin() {
        return fecha_fin;
    }

    public void setFechaFin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
