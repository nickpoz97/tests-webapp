package org.univr.webapp.mvc.presentationLayer.webappStatus;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.mvc.businessLogicLayer.webappStatus.StatusService;

@Getter
public abstract class AbstractStatusController {
    @Autowired
    private StatusService statusService;
}
