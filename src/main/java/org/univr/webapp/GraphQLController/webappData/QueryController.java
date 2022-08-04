package org.univr.webapp.GraphQLController.webappData;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Test;

import java.util.List;

@Controller("DataQueryController")
public class QueryController extends AbstractDataController {

    @QueryMapping
    public List<Test> getAllTests(){
        return getTestService().getAllTests();
    }

    @QueryMapping
    public List<Domanda> getAllDomande() { return getDomandaService().getAllDomande(); }
}
