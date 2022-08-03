package org.univr.webapp.serviceLayer;

import org.springframework.stereotype.Service;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Risposta;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomandaService extends AbstractService{
    public List<Risposta> getRisposte(Domanda domanda){
        return this.getRispostaRepository()
                .findAll()
                .stream()
                .filter(risposta -> risposta.getDomanda().equals(domanda))
                .collect(Collectors.toList());
    }

    public List<Domanda> getAllDomande(){
        return getDomandaRepository().findAll();
    }
}
