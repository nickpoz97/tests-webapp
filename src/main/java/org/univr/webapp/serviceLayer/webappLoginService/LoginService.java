package org.univr.webapp.serviceLayer.webappLoginService;

import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Service;
import org.univr.webapp.dataLayer.webappLogin.LoginRepository;
import org.univr.webapp.model.webappLogin.Login;

import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class LoginService {
    private final LoginRepository loginRepository;
    private final HttpSession httpSession;

    @Autowired
    public LoginService(LoginRepository loginRepository, HttpSession httpSession) {
        this.loginRepository = loginRepository;
        this.httpSession = httpSession;
    }


    public String login(String username, String password) throws NoSuchAlgorithmException {
        Optional<Login> loginQuery = loginRepository.findById(username);
        validateLogin(username, password, loginQuery);
        return httpSession.getId();
    }

    private void validateLogin(String username, String password, Optional<Login> loginQuery) {
        if (loginQuery.isPresent()){
            Login login = loginQuery.get();
            String hash = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
            if (login.getPassword().equals(hash)){
                setAuthentication(username, login, hash);
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

    public String logout(){
        SecurityContextHolder.getContext().setAuthentication(null);
        SecurityContextHolder.clearContext();
        return "Logout success";
    }
}
