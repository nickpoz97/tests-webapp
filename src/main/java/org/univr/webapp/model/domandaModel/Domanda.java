package org.univr.webapp.model.domandaModel;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import lombok.Data;
import org.univr.webapp.model.testModel.Test;

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

    @ManyToMany(mappedBy = "domanda", fetch = FetchType.LAZY)
    private Set<Test> tests = new HashSet<>();
}