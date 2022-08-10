package org.univr.webapp.model.webappData;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "risposta")
@Data
@NoArgsConstructor
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

    public Risposta(String testo, BigDecimal punteggio, Domanda domanda) {
        this.testo = testo;
        this.punteggio = punteggio;
        this.domanda = domanda;
    }
}
