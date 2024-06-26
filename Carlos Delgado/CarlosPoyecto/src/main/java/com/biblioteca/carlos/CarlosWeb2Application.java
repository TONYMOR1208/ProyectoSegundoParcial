package com.biblioteca.carlos;

import com.biblioteca.carlos.security.modelos.User.Role;
import com.biblioteca.carlos.security.modelos.User.User;
import com.biblioteca.carlos.security.modelos.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CarlosWeb2Application {

    public static void main(String[] args) {
        SpringApplication.run(CarlosWeb2Application.class, args);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner demo(UserRepository userRepository) {
        return (args) -> {
            String username = "carlos";
            if (userRepository.findByUsername(username).isEmpty()) {
                User user = User.builder()
                        .username(username)
                        .lastname("carlos")
                        .firstname("delgado")
                        .country("EC")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .build();

                userRepository.save(user);
            } else {
                System.out.println("El usuario con username " + username + " ya existe.");
            }
        };
    }

}
