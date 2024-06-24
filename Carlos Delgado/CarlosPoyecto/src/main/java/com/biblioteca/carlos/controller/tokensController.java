package com.biblioteca.carlos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class tokensController {

    private static final String VALID_TOKEN = "eyJpZCI6MX0.N8SJxB0QNGIEnMQBKwhiLA5gC8M";

    @GetMapping("/authorize")
    public ResponseEntity<String> authorizeRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>("No autorizado", HttpStatus.UNAUTHORIZED);
        }

        String token = authorizationHeader.substring(7);

        if (!isValidToken(token)) {
            return new ResponseEntity<>("Token inválido", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>("Autorizado", HttpStatus.OK);
    }

    private boolean isValidToken(String token) {
        return VALID_TOKEN.equals(token);
    }
}
