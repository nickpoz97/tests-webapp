package org.univr.webapp.GraphQLController;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.Domanda;
import org.univr.webapp.model.Test;

import java.util.List;

@Controller
public class QueryController extends AbstractController {

    @QueryMapping
    public List<Test> getAllTests(){
        return getTestService().getAllTests();
    }

    @QueryMapping
    public List<Domanda> getAllDomande() { return getDomandaService().getAllDomande(); }
}
