package org.univr.webapp.serviceLayer.webappDataService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Risposta;

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

    @PreAuthorize("hasRole('STUDENTE')")
    public List<Domanda> getAllDomande(){
        return getDomandaRepository().findAll();
    }
}
