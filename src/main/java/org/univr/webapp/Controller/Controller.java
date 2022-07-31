package org.univr.webapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.univr.webapp.Repository.DomandaRepository;
import org.univr.webapp.Repository.RispostaRepository;
import org.univr.webapp.Repository.TestRepository;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Test;

import java.time.OffsetDateTime;
import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {
    private final TestRepository testRepository;
    private final DomandaRepository domandaRepository;
    private final RispostaRepository rispostaRepository;

    @Autowired
    public Controller(TestRepository testRepository, DomandaRepository domandaRepository, RispostaRepository rispostaRepository) {
        this.testRepository = testRepository;
        this.domandaRepository = domandaRepository;
        this.rispostaRepository = rispostaRepository;
    }

    @QueryMapping
    public List<Test> getAllTests(){
        return testRepository.findAll();
    }

    @QueryMapping
    public List<Domanda> getAllDomande(){
        return domandaRepository.findAll();
    }

    @SchemaMapping
    public OffsetDateTime data(Test test){
        return test.getTestID().getData();
    }

    @SchemaMapping
    public String nome(Test test){
        return test.getTestID().getNome();
    }
}
