package org.univr.webapp.presentationLayer.webappStatus;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.webappData.Risposta;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Controller("StatusQueryController")
public class QueryController extends AbstractStatusController {

    @QueryMapping
    public List<Risposta> getRisposte(
            @Argument String nomeTest,
            @Argument LocalDate dataTest,
            @Argument LocalTime orarioTest,
            @Argument String idUtente
    ){
        return getStatusService().getRisposte(nomeTest, dataTest, orarioTest);
    }
}
