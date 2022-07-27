package org.univr.webapp.model.testModel;

import lombok.Data;
import org.univr.webapp.model.domandaModel.Domanda;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "test")
@Data
public class Test {
    @EmbeddedId
    private TestID testID;

    @Column(name = "ordinecasuale", nullable = false)
    private boolean ordineCasuale = false;

    @Column(name = "domandeconnumero", nullable = false)
    private boolean domandeConNumero = false;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(
        name = "InTest",
        joinColumns = {
            @JoinColumn(name = "dataTest", referencedColumnName = "data"),
            @JoinColumn(name = "nomeTest", referencedColumnName = "nome")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "domanda", referencedColumnName = "nome")
        }
    )
    private Set<Domanda> domande = new HashSet<>();
}
