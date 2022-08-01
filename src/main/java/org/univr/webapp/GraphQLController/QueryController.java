package org.univr.webapp.GraphQLController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
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
    @Autowired
    private ApplicationContext appContext;

    @QueryMapping
    public List<Test> getAllTests(){
        return appContext.getBean(TestRepository.class).findAll();
    }

    @QueryMapping
    public List<Domanda> getAllDomande() { return appContext.getBean(DomandaRepository.class).findAll(); }
}
