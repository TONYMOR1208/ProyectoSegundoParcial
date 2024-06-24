package com.biblioteca.carlos.validator;

import com.biblioteca.carlos.model.Usuario;

public class Utils {

    public static boolean esNombreValido(String nombre) {
        return !nombre.isEmpty();
    }
    public static boolean esDireccionValida(String direccion) {
        return !direccion.isEmpty();
    }

    public static boolean esTelefonoValido(String telefono) {
        return telefono.matches("\\d{10}");
    }

    public static boolean esCorreoValido(String correo) {
        return correo.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$");
    }

    public static boolean esNumeroValido(Integer valor) {
        return valor != null && valor > 0;
    }

    public static boolean esUsuarioValido(Usuario usuario) {
        return usuario != null && usuario.getId() != null && usuario.getId() > 0;
    }

    public static boolean esFechaValida(String fecha) {
        return fecha.matches("\\d{4}-\\d{2}-\\d{2}");
    }

    public static boolean esHoraValida(String hora) {
        return hora.matches("\\d{2}:\\d{2}");
    }

    public static boolean esCalificacionValida(Integer calificacion) {
        return calificacion != null && calificacion >= 0 && calificacion <= 10;
    }

    public static boolean esComentarioValido(String comentario) {
        return !comentario.isEmpty();
    }

    public static boolean esDescripcionValida(String descripcion) {
        return !descripcion.isEmpty();
    }

    public static boolean esIdValido(Integer id) {
        return id != null && id > 0;
    }

    public static boolean esIdValido(Long id) {
        return id != null && id > 0;
    }

    public static boolean esIdValido(String id) {
        return id.matches("\\d+");
    }

    public static boolean esIdValido(String id, int longitud) {
        return id.matches("\\d{" + longitud + "}");
    }

    public static boolean esIdValido(String id, int longitudMinima, int longitudMaxima) {
        return id.matches("\\d{" + longitudMinima + "," + longitudMaxima + "}");
    }
    
}