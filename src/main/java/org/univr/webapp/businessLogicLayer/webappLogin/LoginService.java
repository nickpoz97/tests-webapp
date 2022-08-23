package org.univr.webapp.businessLogicLayer.webappLogin;

import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.univr.webapp.dataAccessLayer.webappLogin.LoginRepository;
import org.univr.webapp.model.webappLogin.Login;
import org.univr.webapp.presentationLayer.webappData.returnMessages.MutationResult;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class LoginService {
    private final LoginRepository loginRepository;
    private final HttpSession httpSession;
    private final HttpServletRequest request;

    @Autowired
    public LoginService(LoginRepository loginRepository, HttpSession httpSession, HttpServletRequest request) {
        this.loginRepository = loginRepository;
        this.httpSession = httpSession;
        this.request = request;
    }


    public MutationResult login(String username, String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        String hash = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();

        try{
            Optional<Login> loginQuery = loginRepository.findById(username);
            validateLogin(username, hash, loginQuery);
        }
        catch (Exception e){
            return new MutationResult(false, e.getMessage());
        }
        return new MutationResult(true, httpSession.getId());
    }

    private void validateLogin(String username, String password, Optional<Login> loginQuery) {
        if (loginQuery.isPresent()){
            Login login = loginQuery.get();
            if (login.getPassword().equals(password)){
                setAuthentication(username, login, password);
            }
            else{
                throw new BadCredentialsException("Password non valida");
            }
        }
        else{
            throw new BadCredentialsException("Utente non esistente");
        }
    }

    private void setAuthentication(String username, Login login, String hash) {
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(login.getAutorizzazione().name()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, hash, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        httpSession.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
    }

    public MutationResult logout(){
        try{
            new SecurityContextLogoutHandler().logout(request, null, null);
        }
        catch (Exception e){
            return new MutationResult(false, e.getMessage());
        }
        return new MutationResult(true, "Logout success");
    }
}
