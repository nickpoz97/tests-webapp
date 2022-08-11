package org.univr.webapp.presentationLayer.webappLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.businessLogicLayer.webappLogin.LoginService;
import org.univr.webapp.presentationLayer.webappData.returnMessages.MutationResult;

import java.security.NoSuchAlgorithmException;

@Controller("LoginQueryController")
public class MutationController {
    private final LoginService loginService;

    @Autowired
    public MutationController(LoginService loginService) {
        this.loginService = loginService;
    }

    @MutationMapping
    public MutationResult login(@Argument String username, @Argument String password) throws NoSuchAlgorithmException {
        return loginService.login(username, password);
    }

    @MutationMapping
    public MutationResult logout(){
        return loginService.logout();
    }
}
