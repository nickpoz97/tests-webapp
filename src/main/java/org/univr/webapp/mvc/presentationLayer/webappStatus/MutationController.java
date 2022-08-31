package org.univr.webapp.mvc.presentationLayer.webappStatus;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.mvc.presentationLayer.returnMessages.MutationResult;

import java.time.LocalDate;
import java.time.LocalTime;

@Controller("StatusMutationController")
public class MutationController extends  AbstractStatusController{
    @MutationMapping
    public MutationResult addRisposta(@Argument String nomeTest,
                                      @Argument LocalDate dataTest,
                                      @Argument LocalTime orarioTest,
                                      @Argument Long idRisposta,
                                      @Argument String nomeDomanda
    ){
        return getStatusService().addRisposta(nomeTest, dataTest, orarioTest, idRisposta, nomeDomanda);
    }
}
