package org.univr.webapp.GraphQLController.webappLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.model.webappLogin.Ruolo;
import org.univr.webapp.serviceLayer.webappLoginService.LoginService;

@Controller("LoginQueryController")
public class QueryController {
    private final LoginService loginService;

    @Autowired
    public QueryController(LoginService loginService) {
        this.loginService = loginService;
    }

    @QueryMapping
    public Ruolo getRuolo(@Argument String username, @Argument String password){
        return loginService.getRuolo(username, password);
    }
}
