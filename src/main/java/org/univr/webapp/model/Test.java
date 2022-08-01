package org.univr.webapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "test")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Test {
    @Data
    @Embeddable
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TestID implements Serializable {
        @Column(name = "data", nullable = false)
        private LocalDateTime data;
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
    private List<Domanda> domandeList;
}
