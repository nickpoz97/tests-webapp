package org.univr.webapp.GraphQLController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.Repository.DomandaRepository;
import org.univr.webapp.Repository.RispostaRepository;
import org.univr.webapp.Repository.TestRepository;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Test;

import java.util.List;

@Controller
public class QueryController {
    private final TestRepository testRepository;
    private final DomandaRepository domandaRepository;
    private final RispostaRepository rispostaRepository;

    @Autowired
    public QueryController(TestRepository testRepository, DomandaRepository domandaRepository, RispostaRepository rispostaRepository) {
        this.testRepository = testRepository;
        this.domandaRepository = domandaRepository;
        this.rispostaRepository = rispostaRepository;
    }

    @QueryMapping
    public List<Test> getAllTests(){
        return testRepository.findAll();
    }

    @QueryMapping
    public List<Domanda> getAllDomande() { return domandaRepository.findAll(); }
}
