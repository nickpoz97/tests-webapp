package org.univr.webapp.GraphQLController.inputTypes;

import java.util.List;

public record TestInput(
        int giornoDelMese,
        int mese,
        int anno,
        int ora,
        int minuto,
        String nome,
        boolean ordineCasuale,
        boolean domandeConNumero,
        List<String> nomeDomande
) {}
