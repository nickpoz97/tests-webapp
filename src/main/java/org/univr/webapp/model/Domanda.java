package org.univr.webapp.model;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "domanda")
@Data
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
}