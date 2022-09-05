package org.univr.webapp.mvc.presentationLayer.webappData.inputTypes;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record TestInput(
        LocalDate data,
        LocalTime orario,
        String nome,
        boolean ordineCasuale,
        boolean domandeConNumero,
        List<String> nomeDomande
) {
}
