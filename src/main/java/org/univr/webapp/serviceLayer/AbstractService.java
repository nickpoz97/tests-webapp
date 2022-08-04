package org.univr.webapp.serviceLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.dataLayer.webappData.DomandaRepository;
import org.univr.webapp.dataLayer.webappData.RispostaRepository;
import org.univr.webapp.dataLayer.webappData.TestRepository;

public abstract class AbstractService {
    @Autowired
    private DomandaRepository domandaRepository;
    @Autowired
    private RispostaRepository rispostaRepository;
    @Autowired
    private TestRepository testRepository;

    public DomandaRepository getDomandaRepository() {
        return domandaRepository;
    }

    public RispostaRepository getRispostaRepository() {
        return rispostaRepository;
    }

    public TestRepository getTestRepository() {
        return testRepository;
    }
}
