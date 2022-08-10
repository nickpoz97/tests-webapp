package org.univr.webapp.serviceLayer.webappDataService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.univr.webapp.GraphQLController.webappData.inputTypes.DomandaInput;
import org.univr.webapp.GraphQLController.webappData.inputTypes.RispostaInput;
import org.univr.webapp.GraphQLController.webappData.returnMessages.MutationResult;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Risposta;

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

    @Transactional(transactionManager = "dataTransactionManager", rollbackFor = Exception.class)
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

        getRispostaRepository().saveAll(risposte);
        getDomandaRepository().save(domanda);

        return new MutationResult(true, "Domanda Aggiunta");
    }
}
