package org.univr.webapp.mvc.businessLogicLayer.webappData;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Risposta;
import org.univr.webapp.mvc.presentationLayer.returnMessages.MutationResult;
import org.univr.webapp.mvc.presentationLayer.webappData.inputTypes.DomandaInput;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomandaService extends AbstractDataService {
    private static MutationResult checkRisposte(DomandaInput domandaInput) {
        if (domandaInput.risposte().stream()
                .noneMatch(risp -> risp.punteggio().compareTo(new BigDecimal("1.0")) == 0)) {
            return new MutationResult(false, "nessuna risposta ha punteggio 1.0");
        }

        if (domandaInput.risposte().stream()
                .anyMatch(risp -> risp.punteggio().compareTo(new BigDecimal("0.0")) < 0 ||
                        risp.punteggio().compareTo(new BigDecimal("1.0")) > 0)) {
            return new MutationResult(false, "Non sono ammessi punteggi negativi o maggiori di 1");
        }

        return null;
    }

    @PreAuthorize("!isAnonymous()")
    public List<Risposta> getRisposte(Domanda domanda) {
        return this.getRispostaRepository()
                .findAll()
                .stream()
                .filter(risposta -> risposta.getDomanda().equals(domanda))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('INSEGNANTE')")
    public List<Domanda> getAllDomande() {
        return getDomandaRepository().findAll();
    }

    @PreAuthorize("hasAuthority('INSEGNANTE')")
    public MutationResult addDomanda(DomandaInput domandaInput) {
        if (domandaInput.risposte().size() < 2) {
            return new MutationResult(false, "Inserire almeno 2 risposte");
        }

        if (getDomandaRepository().findById(domandaInput.nome()).isPresent()) {
            return new MutationResult(false, "Domanda gia presente");
        }

        if (domandaInput.punti().compareTo(new BigDecimal("0.0")) <= 0) {
            return new MutationResult(false, "La domanda deve valere più di zero punti");
        }

        Domanda domanda = new Domanda(
                domandaInput.nome(),
                domandaInput.testo(),
                domandaInput.punti(),
                domandaInput.ordineCasuale(),
                domandaInput.risposteConNumero()
        );

        MutationResult x = checkRisposte(domandaInput);
        // null implies no errors
        if (x != null) return x;

        List<Risposta> risposte = domandaInput.risposte().stream()
                .map(rispInput -> new Risposta(rispInput.testo(), rispInput.punteggio(), domanda))
                .toList();

        try {
            getDomandaRepository().save(domanda);
            getRispostaRepository().saveAll(risposte);
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new MutationResult(false, e.getMessage());
        }

        return new MutationResult(true, "Domanda Aggiunta");
    }
}