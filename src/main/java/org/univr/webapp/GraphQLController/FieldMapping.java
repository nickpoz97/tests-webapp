package org.univr.webapp.GraphQLController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.univr.webapp.Repository.DomandaRepository;
import org.univr.webapp.Repository.RispostaRepository;
import org.univr.webapp.Repository.TestRepository;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Risposta;
import org.univr.webapp.model.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class FieldMapping {
    @Autowired
    private ApplicationContext appContext;

    @SchemaMapping
    public List<Risposta> risposte(Domanda domanda){
        return appContext.getBean(RispostaRepository.class)
                .findAll()
                .stream()
                .filter(risposta -> risposta.getDomanda().equals(domanda))
                .collect(Collectors.toList());
    }

    @SchemaMapping
    public String nome(Test test){
        return test.getTestID().getNome();
    }

    @SchemaMapping
    public LocalDate data(Test test){
        return test.getTestID().getData().toLocalDate();
    }

    @SchemaMapping
    public LocalTime orario(Test test){
        return test.getTestID().getData().toLocalTime();
    }

    @SchemaMapping
    public List<Domanda> domande(Test test){
        return test.getDomandeList();
    }
}
