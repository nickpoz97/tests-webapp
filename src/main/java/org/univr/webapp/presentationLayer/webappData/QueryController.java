package org.univr.webapp.presentationLayer.webappData;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.webappData.Domanda;
import org.univr.webapp.model.webappData.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Controller("DataQueryController")
public class QueryController extends AbstractDataController {

    @QueryMapping
    public List<Test> getAllTests(){
        return getTestService().getAllTests();
    }

    @QueryMapping
    public List<Domanda> getAllDomande() { return getDomandaService().getAllDomande(); }

    @QueryMapping
    public Optional<Test> getTestById(@Argument LocalDate data, @Argument LocalTime orario, @Argument String nome){
        return getTestService().getTestById(data, orario, nome);
    }
}
