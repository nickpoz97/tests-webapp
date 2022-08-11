package org.univr.webapp.presentationLayer.webappStatus;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.businessLogicLayer.webappStatus.StatusService;

@Getter
public abstract class AbstractStatusController {
    @Autowired
    private StatusService statusService;
}
