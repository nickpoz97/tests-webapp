package org.univr.webapp.presentationLayer.webappStatus;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.presentationLayer.webappData.returnMessages.MutationResult;

import java.time.LocalDate;
import java.time.LocalTime;

@Controller("StatusMutationController")
public class MutationController extends  AbstractStatusController{
    @MutationMapping
    public MutationResult addRisposta(@Argument String nomeTest,
                                      @Argument LocalDate dataTest,
                                      @Argument LocalTime orarioTest,
                                      @Argument Long idRisposta){
        return getStatusService().addRisposta(nomeTest, dataTest, orarioTest, idRisposta);
    }
}