package org.univr.webapp.businessLogicLayer.webappDataService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Risposta;
import org.univr.webapp.presentationLayer.webappData.inputTypes.DomandaInput;
import org.univr.webapp.presentationLayer.webappData.inputTypes.RispostaInput;
import org.univr.webapp.presentationLayer.webappData.returnMessages.MutationResult;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomandaService extends AbstractDataService {
    public List<Risposta> getRisposte(Domanda domanda){
        return this.getRispostaRepository()
                .findAll()
                .stream()
                .filter(risposta -> risposta.getDomanda().equals(domanda))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasAnyAuthority('STUDENTE', 'INSEGNANTE')")
    public List<Domanda> getAllDomande(){
        return getDomandaRepository().findAll();
    }


    public MutationResult addDomanda(DomandaInput domandaInput){
        if (domandaInput.risposte().size() < 2){
            return new MutationResult(false, "Inserire almeno 2 risposte");
        }

        Domanda domanda = new Domanda(
                domandaInput.nome(),
                domandaInput.testo(),
                domandaInput.punti(),
                domandaInput.ordineCasuale(),
                domandaInput.risposteConNumero()
        );

        List<Risposta> risposte = new LinkedList<>();
        if (domandaInput.risposte().stream().noneMatch(risp -> risp.punteggio().compareTo(new BigDecimal("1.0")) == 0)){
            return new MutationResult(false, "nessuna risposta ha punteggio 1.0");
        }

        for (RispostaInput rispostaInput : domandaInput.risposte()){
            if (rispostaInput.punteggio().compareTo(new BigDecimal("0.0")) < 0){
                return new MutationResult(false, "Non sono ammessi punteggi negativi");
            }
            risposte.add(new Risposta(domandaInput.testo(), rispostaInput.punteggio(), domanda));
        }

        try {
            getDomandaRepository().save(domanda);
            getRispostaRepository().saveAll(risposte);
        }
        catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new MutationResult(false, e.getMessage());
        }

        return new MutationResult(true, "Domanda Aggiunta");
    }
}
