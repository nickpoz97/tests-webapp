package org.univr.webapp.presentationLayer.webappData.inputTypes;

import java.math.BigDecimal;

public record RispostaInput(
        String testo,
        BigDecimal punteggio
) {}
