package org.univr.webapp.GraphQLController;

import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Risposta;
import org.univr.webapp.model.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Controller
public class FieldMapping extends AbstractController {
    @SchemaMapping
    public List<Risposta> risposte(Domanda domanda){
        return getDomandaService().getRisposte(domanda);
    }

    @SchemaMapping
    public String nome(Test test){
        return test.getTestID().getNome();
    }

    @SchemaMapping
    public LocalDate data(Test test){
        return getTestService().getData(test);
    }

    @SchemaMapping
    public LocalTime orario(Test test){
        return getTestService().getOrario(test);
    }

    @SchemaMapping
    public List<Domanda> domande(Test test){
        return getTestService().getDomande(test);
    }
}
