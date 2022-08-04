package org.univr.webapp.GraphQLController.webappData;

import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.serviceLayer.webappDataService.DomandaService;
import org.univr.webapp.serviceLayer.webappDataService.RispostaService;
import org.univr.webapp.serviceLayer.webappDataService.TestService;

public abstract class AbstractDataController {
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
