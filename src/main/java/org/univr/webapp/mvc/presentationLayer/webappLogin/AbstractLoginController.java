package org.univr.webapp.mvc.presentationLayer.webappLogin;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.univr.webapp.mvc.businessLogicLayer.webappLogin.LoginService;

@Getter
public abstract class AbstractLoginController {
    @Autowired
    private LoginService loginService;
}
