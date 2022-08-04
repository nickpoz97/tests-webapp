package org.univr.webapp.model.webappLogin;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Login")
@Data
public class Login {
    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "ruolo", nullable = false)
    private Ruolo ruolo;

    @Column(name = "enabled", nullable = false)
    private Boolean enabled;
}
