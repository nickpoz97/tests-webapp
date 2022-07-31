package org.univr.webapp.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Set;

@Entity
@Table(name = "test")
@Data
public class Test {
    @Data
    @Embeddable
    public static class TestID implements Serializable {
        @Column(name = "data", nullable = false)
        private OffsetDateTime data;
        @Column(name = "nome", nullable = false)
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
