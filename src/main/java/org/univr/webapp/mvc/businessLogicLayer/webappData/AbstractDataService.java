package org.univr.webapp.mvc.businessLogicLayer.webappData;

import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.mvc.dataAccessLayer.webappData.DomandaRepository;
import org.univr.webapp.mvc.dataAccessLayer.webappData.RispostaRepository;
import org.univr.webapp.mvc.dataAccessLayer.webappData.TestRepository;

public abstract class AbstractDataService {
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
