package org.univr.webapp.presentationLayer.webappLogin;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.businessLogicLayer.webappLogin.LoginService;

@Getter
public abstract class AbstractLoginController {
    @Autowired
    private LoginService loginService;
}
