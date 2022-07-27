package org.univr.webapp.model.rispostaModel;

import lombok.Data;
import org.univr.webapp.model.domandaModel.Domanda;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "risposta")
@Data
public class Risposta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "testo", nullable = false)
    private String testo;

    @Column(name = "punteggio")
    private BigDecimal punteggio;

    @OneToOne
    @JoinColumn(name = "domanda")
    private Domanda domanda;
}
