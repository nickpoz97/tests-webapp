package org.univr.webapp.GraphQLController;

import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.serviceLayer.DomandaService;
import org.univr.webapp.serviceLayer.RispostaService;
import org.univr.webapp.serviceLayer.TestService;

public abstract class AbstractController {
    @Autowired
    private DomandaService domandaService;
    @Autowired
    private RispostaService rispostaService;
    @Autowired
    private TestService testService;

    public DomandaService getDomandaService() {
        return domandaService;
    }

    public RispostaService getRispostaService() {
        return rispostaService;
    }

    public TestService getTestService() {
        return testService;
    }
}
