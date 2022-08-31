package org.univr.webapp.mvc.presentationLayer.webappData;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.mvc.businessLogicLayer.webappData.DomandaService;
import org.univr.webapp.mvc.businessLogicLayer.webappData.RispostaService;
import org.univr.webapp.mvc.businessLogicLayer.webappData.TestService;

@Getter
public abstract class AbstractDataController {
    @Autowired
    private DomandaService domandaService;
    @Autowired
    private RispostaService rispostaService;
    @Autowired
    private TestService testService;
}
