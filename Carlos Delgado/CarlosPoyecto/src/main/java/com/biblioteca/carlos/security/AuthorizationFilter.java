package com.biblioteca.carlos.security;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.biblioteca.carlos.controller.HttpServletRequest;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthorizationFilter extends HttpFilter {

    private static final String VALID_TOKEN = "SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE=";

    protected void doFilter(ServletRequest request, HttpServletResponse response, jakarta.servlet.FilterChain chain)
                        throws IOException, ServletException {
        String authorizationHeader = ((HttpServletRequest) request).getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autorizado");
            return;
        }

        String token = authorizationHeader.substring(7);

        if (!VALID_TOKEN.equals(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido");
            return;
        }

        chain.doFilter(request, response);
    }
}
