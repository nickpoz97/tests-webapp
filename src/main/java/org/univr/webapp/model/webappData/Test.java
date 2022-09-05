package org.univr.webapp.model.webappData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "test")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Test {
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

    public Test(LocalDateTime data, String nome, boolean ordineCasuale, boolean domandeConNumero, List<Domanda> domandeList) {
        this.testID = new TestID(data, nome);
        this.ordineCasuale = ordineCasuale;
        this.domandeConNumero = domandeConNumero;
        this.domandeList = domandeList;
    }

    @Data
    @Embeddable
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TestID implements Serializable {
        @Column(name = "data", nullable = false)
        private LocalDateTime data;
        @Column(name = "nome", nullable = false)
        private String nome;
    }
}
