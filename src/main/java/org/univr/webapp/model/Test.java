package org.univr.webapp.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "test")
@Data
public class Test {
    @Data
    @Embeddable
    private static class TestID implements Serializable {
        @Column(name = "data")
        private LocalDateTime data;
        @Column(name = "nome")
        private String nome;
    }

    @EmbeddedId
    private TestID testID;

    @Column(name = "ordinecasuale", nullable = false)
    private boolean ordineCasuale = false;

    @Column(name = "domandeconnumero", nullable = false)
    private boolean domandeConNumero = false;

    @ManyToMany
    @JoinTable(
        name = "intest",
        joinColumns = {
            @JoinColumn(name = "datatest"),
            @JoinColumn(name = "nometest")
        },
        inverseJoinColumns = @JoinColumn(name = "domanda")
    )
    private Set<Domanda> domandeSet;
}
