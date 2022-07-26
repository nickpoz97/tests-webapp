package org.univr.webapp.mvc.presentationLayer.webappData.inputTypes;

import java.math.BigDecimal;
import java.util.List;

public record DomandaInput(
        String nome,
        String testo,
        BigDecimal punti,
        boolean ordineCasuale,
        boolean risposteConNumero,
        List<RispostaInput> risposte
) {
}
