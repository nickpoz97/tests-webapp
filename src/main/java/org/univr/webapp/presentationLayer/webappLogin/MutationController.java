package org.univr.webapp.presentationLayer.webappLogin;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import org.univr.webapp.presentationLayer.webappData.returnMessages.MutationResult;

import java.security.NoSuchAlgorithmException;

@Controller("LoginMutationController")
public class MutationController extends AbstractLoginController{

    @MutationMapping
    public MutationResult login(@Argument String username, @Argument String password) throws NoSuchAlgorithmException {
        return getLoginService().login(username, password);
    }

    @MutationMapping
    public MutationResult logout(){
        return getLoginService().logout();
    }
}
