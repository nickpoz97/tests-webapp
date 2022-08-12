package org.univr.webapp.presentationLayer.webappData;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.presentationLayer.webappData.inputTypes.DomandaInput;
import org.univr.webapp.presentationLayer.webappData.inputTypes.TestInput;
import org.univr.webapp.presentationLayer.webappData.returnMessages.MutationResult;

@Controller
public class MutationController extends AbstractDataController {
    @MutationMapping
    public MutationResult addTest(@Argument TestInput testInput) {
        return getTestService().insertTest(testInput);
    }

    @MutationMapping
    public MutationResult addDomanda(@Argument DomandaInput domandaInput){
        return getDomandaService().addDomanda(domandaInput);
    }
}