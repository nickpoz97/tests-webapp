package org.univr.webapp.presentationLayer.webappLogin;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.presentationLayer.returnMessages.LoginInfo;
import org.univr.webapp.presentationLayer.returnMessages.MutationResult;

@Controller("LoginMutationController")
public class MutationController extends AbstractLoginController{

    @MutationMapping
    public LoginInfo login(@Argument String username, @Argument String password) {
        return getLoginService().login(username, password);
    }

    @MutationMapping
    public MutationResult logout(){
        return getLoginService().logout();
    }
}
