package org.univr.webapp.model.webappData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "domanda")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Domanda{
    @Id
    @Column(name  = "nome")
    private String nome;

    @Column(name = "testo", nullable = false)
    private  String testo;

    @Column(name = "punti")
    private  BigDecimal punti;

    @Column(name = "ordinecasuale", nullable = false)
    private boolean ordineCasuale = false;

    @Column(name = "risposteconnumero", nullable = false)
    private boolean risposteConNumero = false;

    @ManyToMany(mappedBy = "domandeList")
    private List<Test> testList;

    public Domanda(String nome, String testo, BigDecimal punti, boolean ordineCasuale, boolean risposteConNumero) {
        this.nome = nome;
        this.testo = testo;
        this.punti = punti;
        this.ordineCasuale = ordineCasuale;
        this.risposteConNumero = risposteConNumero;
    }
}