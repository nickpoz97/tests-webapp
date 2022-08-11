package org.univr.webapp.presentationLayer.webappData;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.businessLogicLayer.webappData.DomandaService;
import org.univr.webapp.businessLogicLayer.webappData.RispostaService;
import org.univr.webapp.businessLogicLayer.webappData.TestService;

@Getter
public abstract class AbstractDataController {
    @Autowired
    private DomandaService domandaService;
    @Autowired
    private RispostaService rispostaService;
    @Autowired
    private TestService testService;
}
