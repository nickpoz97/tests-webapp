package org.univr.webapp.GraphQLController.webappData.inputTypes;

import java.math.BigDecimal;

public record RispostaInput(
        String testo,
        BigDecimal punteggio
) {}
