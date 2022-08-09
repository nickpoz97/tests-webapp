package org.univr.webapp.GraphQLController.webappLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.webappLogin.Autorizzazione;
import org.univr.webapp.serviceLayer.webappLoginService.LoginService;

import java.security.NoSuchAlgorithmException;

@Controller("LoginQueryController")
public class QueryController {
    private final LoginService loginService;

    @Autowired
    public QueryController(LoginService loginService) {
        this.loginService = loginService;
    }

    @MutationMapping
    public String login(@Argument String username, @Argument String password) throws NoSuchAlgorithmException {
        return loginService.login(username, password);
    }

    @MutationMapping
    public String logout(){
        return loginService.logout();
    }
}
